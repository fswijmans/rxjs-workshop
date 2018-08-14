import { Subject, concat, interval, merge, of, zip } from 'rxjs';
import { bufferCount, debounceTime, distinctUntilChanged, filter, map, mapTo, max, publishReplay, refCount, skip, startWith, take, withLatestFrom } from 'rxjs/operators'; // tslint:disable-line:max-line-length
import { reduce, scan } from '../lib/patched-rxjs-operators';
import { shape$ } from '../lib/example-streams';
import { checkSolution } from '../lib/solution-checker/index';

// ASSIGNMENT: Use the reduce operator to find the shape that has the largest surface area.
//
// NOTE: RxJS has a max operator (not discussed in the presentation), which you normally would use for scenario's like this assignment.
// However, for this exercise we want you use the reduce operator to become more familiar with that operator.
//
// HINT: Reduce does not emit intermediate results, it may therefore take some time before the result is available and printed to the
// console.

const largestShape$ = shape$; // ???

// If implemented correctly, only one line is printed to console:
//   Circle 40: 5026.55

checkSolution(largestShape$);
