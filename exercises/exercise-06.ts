import { Subject, concat, interval, merge, of, zip } from 'rxjs';
import { bufferCount, debounceTime, distinctUntilChanged, filter, map, mapTo, max, publishReplay, refCount, skip, startWith, take, withLatestFrom } from 'rxjs/operators'; // tslint:disable-line:max-line-length
import { reduce, scan } from '../lib/patched-rxjs-operators';
import { number$ } from '../lib/example-streams';
import { checkSolution } from '../lib/solution-checker/index';

// ASSIGNMENT: Compute the sum of all numbers emitted by the number$ stream. The result should be stored in a new stream that also contains
// the intermediate sum. For example given a stream of numbers 1, 2, 3, the resulting stream should emit the following numbers:
// 1 (first value), 3 (1 + 2) and 6 (3 + 3).

const sum$ = number$.pipe(
    // ???
);

// When implemented correctly you should see the following numbers: 1, 10, 14, 21, 27

checkSolution(sum$);
