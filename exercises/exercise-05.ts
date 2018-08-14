import { Subject, concat, interval, merge, of, zip } from 'rxjs';
import { bufferCount, debounceTime, distinctUntilChanged, filter, map, mapTo, max, publishReplay, refCount, skip, startWith, take, withLatestFrom } from 'rxjs/operators'; // tslint:disable-line:max-line-length
import { reduce, scan } from '../lib/patched-rxjs-operators';
import { number$ } from '../lib/example-streams';
import { checkSolution } from '../lib/solution-checker/index';

// ASSIGNMENT: create a new stream that emits the square of each number emitted by the number$ stream.

const squaredNumber$ = number$.pipe(
    // ???
);

// If implemented correctly, the application will output the following numbers: 1, 81, 16, 49, 36, 4, 4, 49, 9, 16, 64

checkSolution(squaredNumber$);
