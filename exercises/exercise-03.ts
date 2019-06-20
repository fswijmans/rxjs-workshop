import { Subject, concat, interval, merge, of, zip } from "rxjs";
import {
    bufferCount,
    debounceTime,
    distinctUntilChanged,
    filter,
    map,
    mapTo,
    max,
    publishReplay,
    refCount,
    skip,
    startWith,
    take,
    withLatestFrom
} from "rxjs/operators"; // tslint:disable-line:max-line-length
import { reduce, scan } from "../lib/patched-rxjs-operators";
import { number$ } from "../lib/example-streams";
import { checkSolution } from "../lib/solution-checker/index";

// ASSIGNMENT: Create a new stream called `evenNumber$`,
//  which is based on the number$ stream and only emits even numbers.
//
// HINT: Starting with this exercise you no longer have to subscribe to your observable stream yourself.
// Instead the solution is
// automatically checked for correctness through the `checkSolution` function, which is called at the end of the exercise. This function
// also prints out the output of your observable stream. For testing and debugging purposes you can still subscribe to your stream, however,
// to have your solution checked be sure that the `checkSolution` function is called.

const evenFn = (x: number) => x % 2 === 0;

const evenNumber$ = number$.pipe(filter(evenFn));

// If implemented correctly, the application will output the following numbers: 4, 6, 2, 2, 4, 8

checkSolution(evenNumber$);
