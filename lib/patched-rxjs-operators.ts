import { OperatorFunction } from 'rxjs';
import { reduce as __reduce, scan as __scan } from 'rxjs/operators';

// Alternative type definitions for the RxJS reduce operator to work around the type inferrence issues.
export function reduce<T>(accumulator: (acc: T, value: T, index: number) => T): OperatorFunction<T, T>;
export function reduce<T, R>(accumulator: (acc: R, value: T, index: number) => R, seed: R): OperatorFunction<T, R>;
export function reduce(accumulator: (acc: any, value: any, index: number) => any, seed?: any): OperatorFunction<any, any> {
    if (arguments.length >= 2) {
        return __reduce(accumulator, seed);
    }

    return __reduce(accumulator);
}

// Alternative type definitions for the RxJS scan operator to work around the type inferrence issues.
export function scan<T>(accumulator: (acc: T, value: T, index: number) => T): OperatorFunction<T, T>;
export function scan<T, R>(accumulator: (acc: R, value: T, index: number) => R, seed: R): OperatorFunction<T, R>;
export function scan(accumulator: (acc: any, value: any, index: number) => any, seed?: any): OperatorFunction<any, any> {
    if (arguments.length >= 2) {
        return __scan(accumulator, seed);
    }

    return __scan(accumulator);
}
