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
import { isPrime } from "../lib/utils";
import { checkSolution } from "../lib/solution-checker/index";

// ASSIGNMENT: Use the number$ stream to define a new stream that only contains those numbers that are prime number.
//
// HINT: You can make use of the utility function isPrime to check if a given number is a prime number. You DON'T have to write your own
// function to check whether a number is a prime.

const primeNumber$ = number$.pipe(filter(isPrime));

// If implemented correctly, the application will output the following numbers: 1, 7, 2, 2, 7, 3

checkSolution(primeNumber$);
