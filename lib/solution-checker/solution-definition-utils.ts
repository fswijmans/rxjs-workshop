import { almostEqual } from './util';
import {
    EqualityChecker,
    ObservableCompleteEvent,
    ObservableEvent,
    ObservableNextEvent,
    Timestamp,
    ValueFormatter
} from './solution-definition.model';

export function regularIntervalEvents<T>(interval: number, ...values: T[]): ObservableEvent<T>[] {
    return [
        ...values.map((value) => ObservableEvent.next(value, Timestamp.delta(interval))),
        ObservableEvent.complete(Timestamp.delta(0))
    ];
}

export function next<T>(value: T, timestamp: number): ObservableNextEvent<T> {
    return ObservableEvent.next(value, Timestamp.absolute(timestamp));
}

export function complete(timestamp: number): ObservableCompleteEvent {
    return ObservableEvent.complete(Timestamp.absolute(timestamp));
}

export function stackJoin([head, ...tail]: string[], separator: string = ''): string[] {
    return tail.reduce((a, b) => [...a, a[a.length - 1] + separator + b], [head]);
}

export function numberFormatted(factionDigits: number): ValueFormatter {
    return (value: any) => {
        if (typeof value === 'number') {
            return value.toFixed(factionDigits);
        }

        return String(value);
    };
}

export function floatingPointNumberEqualityChecker(epsilon: number): EqualityChecker<number> {
    return (actual: any, expected: number) => {
        if (actual === expected) {
            return true;
        }

        return typeof actual === 'number' && typeof (expected as any) === 'number' && almostEqual(actual, expected, epsilon);
    };
}
