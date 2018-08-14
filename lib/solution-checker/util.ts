import { Observable, Observer } from 'rxjs';
import { ObservableEvent, Timestamp } from './solution-definition.model';

export function getCurrentExerciseNumber(): number | undefined {
    const callStack = new Error().stack || '';

    const exerciseNumber = callStack
        .split('\n')
        .map((line) => line.match(/\Wexercise-(\d\d)\.ts/))
        .map((match) => match && match[1])
        .find((match) => match !== null);

    return typeof exerciseNumber === 'string' ? Number.parseInt(exerciseNumber) : undefined;
}

export function toObservableEventStream<T>(input$: Observable<T>): Observable<ObservableEvent<T>> {
    return new Observable((observer: Observer<ObservableEvent<T>>) => {
        const startTime = Date.now();

        function elapsedTime(): Timestamp {
            return Timestamp.absolute(Date.now() - startTime);
        }

        const subscription = input$.subscribe({
            next: (value) => observer.next(ObservableEvent.next(value, elapsedTime())),
            error: (error) => {
                observer.next(ObservableEvent.error(error, elapsedTime()));
                observer.complete();
            },
            complete: () => {
                observer.next(ObservableEvent.complete(elapsedTime()));
                observer.complete();
            }
        });

        return () => subscription.unsubscribe();
    });
}

const MIN_NORMAL = Math.pow(2, -1022);

export function almostEqual(a: number, b: number, epsilon: number = 0.00001): boolean {
    if (a === b) {
        return true;
    }

    const difference = Math.abs(a - b);

    if (a === 0 || b === 0 || difference < MIN_NORMAL) {
        return difference < epsilon * MIN_NORMAL;
    }

    return difference / (Math.abs(a) + Math.abs(b)) < epsilon;
}
