import { Observable, concat, from, of, throwError, zip, range } from 'rxjs';
import { map, mergeMap, publishReplay, refCount } from 'rxjs/operators';

import { pad, padStart, random } from 'lodash';

import chalk from 'chalk';

import { argv } from 'yargs';

import { SOLUTION_MAP } from './solutions';
import {
    EqualityChecker,
    ObservableEvent,
    ObservableEventType,
    SolutionDefinition,
    TimestampType,
    ValueFormatter
} from './solution-definition.model';
import { getCurrentExerciseNumber, toObservableEventStream } from './util';
import { scan } from '../patched-rxjs-operators';

const CORRECT_SOLUTION_MESSAGES = [
    'Yay! Your solution is correct. Awesome job... now go do the next exercise!',
    'Well done, everything seems to be in order! HOORAY! :D',
    'You nailed it! Job\'s done... now move on the next one... what are you waiting for?... it\'s not going to solve itself!',
    'Correctomundo! Piece of cake, wasn\'t it?',
    'Guess what??? You absolutely PASSED this one! Feel free to cheer awkwardly loud now :D',
    'Hmmm, we have to conclude that you cracked this one. Congrats!',
    'Hey! You did it, which means it\'s party time! whoop whoop',
    '> console.log("CORRECT"); // This is printed when the solution is correct -- Which captain obvious added this useless comment?',
    'That\'s correct. So, you think you\'re smart ey? Well I dare you to try the next one muhuhahahaha',
    'The Reactive Council has ruled in your favour: your solution has been accepted',
    '[x] correct, [ ] incorrect',
    'Nice! You have given a valid solution! This earned you a break of exactly 10 seconds...'
];

const INCORRECT_SOLUTION_MESSAGES = [
    'Oops! That was not exactly right, but don\'t give up!',
    'Sorry, your solution is not correct. Keep on trying!',
    'Unfortunately that is not the solution to this exercise. Just shout HELP if you need help ;)',
    'We cannot approve this solution, however, feel free to give it another try',
    'That was not the correct solution for this exercise. Fortunately your premium package comes with an UNLIMITED number of attempts :D'
];

const DEFAULT_MAX_ALLOWED_TIME_DRIFT = 50; // Milliseconds.

export function checkSolution(providedSolution$: Observable<any>, subsolution?: string): void {

    const exerciseNumber = getCurrentExerciseNumber();

    if (exerciseNumber === undefined) {
        throw new Error('Failed to determine current exercise number');
    }

    const exerciseId = exerciseNumber.toString() + (subsolution !== undefined ? '-' + subsolution : '');

    const solutionDefinition = SOLUTION_MAP.get(exerciseId);

    if (solutionDefinition === undefined) {
        throw new Error(`No solution definition exists for exercise ${exerciseId}`);
    }

    console.log(chalk.cyan('Checking solution...'));

    if (
        !providedSolution$ ||
        typeof (providedSolution$ as any).pipe !== 'function' ||
        typeof (providedSolution$ as any).subscribe !== 'function'
    ) {
        printResultMessage(INCORRECT_SOLUTION_MESSAGES, chalk.red);
        console.log();
        console.log(chalk.yellow('Your solution appears to be something other than an observable stream!'));
        console.log(chalk.yellow('Make sure that whatever you pass to the `checkSolution` function is an observable.'));

        return;
    }

    const skipTimingChecks = !!argv.skipTimingChecks;

    if (skipTimingChecks) {
        console.log(chalk.yellow('Warning: event timing checks have been') + ' ' + chalk.red('DISABLED!'));
        console.log();
    }

    function printSolutionVerificationProgressEvent(progressEvent: SolutionVerificationProgressEvent): void {

        function progressEventHasError(errorType: SolutionVerificationErrorType): boolean {
            return progressEvent.errors.some(({ type }) => type === errorType);
        }

        const isCorrect = progressEvent.errors.length === 0;
        const timingCorrect = !progressEventHasError(SolutionVerificationErrorType.INCORRECT_TIMING);
        const eventTypeCorrect = !progressEventHasError(SolutionVerificationErrorType.INCORRECT_EVENT_TYPE);
        const valueCorrect = !eventTypeCorrect ? undefined : !progressEventHasError(SolutionVerificationErrorType.INCORRECT_VALUE);

        function colored(success: boolean | undefined): (...text: string[]) => string {
            if (success === undefined) {
                return (...text: string[]) => text.join();
            }

            return chalk[success ? 'green' : 'red'];
        }

        console.log([
            padStart(progressEvent.eventNumber.toString(), 4) + ' ',
            colored(isCorrect)(pad(isCorrect ? 'yes' : 'no', 9)),
            colored(timingCorrect)(pad(formatTimestamp(progressEvent.timestamp), 10)),
            colored(eventTypeCorrect)(pad(progressEvent.emittedEventType, 10)),
            ' ' + colored(valueCorrect)(progressEvent.formattedValue)
        ].join('|'));
    }

    function formatTimestamp(timestamp: number): string {
        const seconds = (timestamp / 1000) % 60;
        const minutes = Math.floor(timestamp / 60000);

        return padStart(minutes.toString(), 2, '0') + ':' + padStart(seconds.toFixed(2), 5, '0');
    }

    function printResultMessage(messages: string[], colorizer: (...text: string[]) => string): void {
        console.log();
        console.log(colorizer(messages[random(0, messages.length - 1, false)]));
    }

    function formatSolutionVerificationError(error: SolutionVerificationError, eventNumber: number): string {

        const highlightedEventNumber = chalk.yellow(eventNumber.toString());

        if (error.type === SolutionVerificationErrorType.INCORRECT_EVENT_TYPE) {
            return [
                `Expected event #${highlightedEventNumber} to be a ${chalk.yellow(error.expectedEventType)} event,`,
                `but got a ${chalk.yellow(error.actualEventType)} event instead`
            ].join(' ');
        }

        if (error.type === SolutionVerificationErrorType.INCORRECT_VALUE) {
            return [
                `Expected value for event #${highlightedEventNumber} to be ${chalk.yellow(error.expectedValue)},`,
                `but got ${chalk.yellow(error.actualValue)} instead`
            ].join(' ');
        }

        return [
            `Expected value for event #${highlightedEventNumber}`,
            `to be emitted at ${chalk.yellow('~' + formatTimestamp(error.expectedTimestamp))},`,
            `but it was emitted at ${chalk.yellow(formatTimestamp(error.actualTimestamp))} instead`
        ].join(' ');
    }

    console.log();
    console.log('   # | CORRECT |   TIME   |   EVENT  | VALUE            ');
    console.log('-----+---------+----------+----------+------------------');

    verifySolution(providedSolution$, solutionDefinition, skipTimingChecks).subscribe({
        next: printSolutionVerificationProgressEvent,
        error: (error) => {
            printResultMessage(INCORRECT_SOLUTION_MESSAGES, chalk.red);

            if (error instanceof SolutionIncorrectError) {
                console.log();
                console.log(chalk.yellow('To help you out a little, this is what is wrong:'));
                console.log();
                error.verificationErrors.forEach((verificationError) => {
                    console.log(chalk.yellow(' * ') + formatSolutionVerificationError(verificationError, error.eventNumber));
                });
            }
        },
        complete: () => printResultMessage(CORRECT_SOLUTION_MESSAGES, chalk.green)
    });

}

function verifySolution(
    providedSolution$: Observable<any>,
    solutionDefinition: SolutionDefinition<any>,
    skipTimingChecks: boolean = false
): Observable<SolutionVerificationProgressEvent> {

    const eventNumber$ = range(1, 100000);

    const actualEvent$ = toObservableEventStream(providedSolution$).pipe(
        publishReplay(),
        refCount()
    );

    const expectedEvent$ = from(solutionDefinition.expectedEvents);

    const expectedEventAbsoluteTimestamp$ = expectedEvent$.pipe(
        map(({ timestamp }) => timestamp),
        scan((lastTimestamp, nextTimestamp) => {
            if (nextTimestamp.type === TimestampType.ABSOLUTE) {
                return nextTimestamp.value;
            }

            return lastTimestamp + nextTimestamp.value;
        }, 0)
    );

    const initialTimeDrift: TimeDrift = { total: 0, delta: 0 };

    const timeDrift$ = zip(actualEvent$.pipe(map(({ timestamp }) => timestamp.value)), expectedEventAbsoluteTimestamp$).pipe(
        scan((timeDrift, [ actualTimestamp, expectedTimestamp ]) => {

            const delta = actualTimestamp - expectedTimestamp - timeDrift.total;
            const total = timeDrift.total + delta;

            return as<TimeDrift>({ total, delta });

        }, initialTimeDrift)
    );

    return zip(eventNumber$, actualEvent$, expectedEvent$, expectedEventAbsoluteTimestamp$, timeDrift$).pipe(
        map(([eventNumber, actual, expected, expectedTimestamp, timeDrift]) => {
            const errors = checkForSolutionVerificationErrors(
                actual,
                expected,
                expectedTimestamp,
                timeDrift,
                skipTimingChecks,
                solutionDefinition
            );

            const progressEvent: SolutionVerificationProgressEvent = {
                eventNumber,
                errors,
                timestamp: actual.timestamp.value,
                emittedEventType: actual.type,
                formattedValue: formatValue(actual, solutionDefinition.valueFormatter)
            };

            return { progressEvent, errors };
        }),
        mergeMap(({ progressEvent, errors }) => concat(
            of(progressEvent),
            ...(errors.length > 0 ? [throwError(new SolutionIncorrectError(progressEvent.eventNumber, errors))] : [])
        ))
    );
}

function checkForSolutionVerificationErrors(
    actual: ObservableEvent<any>,
    expected: ObservableEvent<any>,
    expectedTimestamp: number,
    timeDrift: TimeDrift,
    skipTimingChecks: boolean,
    solutionDefinition: SolutionDefinition<any>,
): SolutionVerificationError[] {
    const errors: SolutionVerificationError[] = [];

    // Check event types.
    if (actual.type !== expected.type) {
        errors.push(new IncorrectEventTypeVerificationError(actual.type, expected.type));
    }

    // Check values.
    if (
        actual.type === ObservableEventType.NEXT &&
        expected.type === ObservableEventType.NEXT &&
        !checkEquality(actual.value, expected.value, solutionDefinition.equalityChecker)
    ) {
        errors.push(new IncorrectValueVerificationError(
            formatValue(actual, solutionDefinition.valueFormatter),
            formatValue(expected, solutionDefinition.valueFormatter)
        ));
    }

    // Check timestamps.
    const allowedTimeDrift = solutionDefinition.maxTimeDrift || DEFAULT_MAX_ALLOWED_TIME_DRIFT;
    if (!skipTimingChecks && Math.abs(timeDrift.delta) > allowedTimeDrift) {
        errors.push(new IncorrectTimingVerificationError(
            actual.timestamp.value,
            expectedTimestamp + timeDrift.total - timeDrift.delta
        ));
    }

    return errors;
}

function checkEquality(actual: any, expected: any, equalityChecker?: EqualityChecker<any>): boolean {

    if (equalityChecker !== undefined) {
        return equalityChecker(actual, expected);
    }

    if (actual === expected) {
        return true;
    }

    if (!!expected && typeof expected.equals === 'function') {
        return expected.equals(actual);
    }

    return false;
}

function formatValue(event: ObservableEvent<any>, format?: ValueFormatter): string {

    if (event.type === ObservableEventType.COMPLETE) {
        return '';
    }
    const value = event.type === ObservableEventType.NEXT ? event.value : event.error;

    try {
        if (format !== undefined) {
            return format(value);
        }
    } catch (error) { }

    return String(value);
}

interface TimeDrift {
    total: number;
    delta: number;
}

interface SolutionVerificationProgressEvent {
    eventNumber: number;
    errors: SolutionVerificationError[];
    timestamp: number;
    emittedEventType: ObservableEventType;
    formattedValue: string;
}

enum SolutionVerificationErrorType {
    INCORRECT_EVENT_TYPE,
    INCORRECT_VALUE,
    INCORRECT_TIMING
}

class IncorrectEventTypeVerificationError {
    public readonly type = SolutionVerificationErrorType.INCORRECT_EVENT_TYPE;

    constructor(
        public readonly actualEventType: ObservableEventType,
        public readonly expectedEventType: ObservableEventType
    ) {}
}

class IncorrectValueVerificationError {
    public readonly type = SolutionVerificationErrorType.INCORRECT_VALUE;

    constructor(
        public readonly actualValue: any,
        public readonly expectedValue: any
    ) {}
}

class IncorrectTimingVerificationError {
    public readonly type = SolutionVerificationErrorType.INCORRECT_TIMING;

    constructor(
        public readonly actualTimestamp: number,
        public readonly expectedTimestamp: number
    ) {}
}

type SolutionVerificationError = IncorrectEventTypeVerificationError | IncorrectValueVerificationError | IncorrectTimingVerificationError;

class SolutionIncorrectError extends Error {

    constructor(
        public readonly eventNumber: number,
        public readonly verificationErrors: SolutionVerificationError[]
    ) {
        super();
    }
}

function as<T>(value: T): T {
    return value;
}
