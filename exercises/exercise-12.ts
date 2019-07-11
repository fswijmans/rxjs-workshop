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
import { point$ } from "../lib/example-streams";
import { checkSolution } from "../lib/solution-checker/index";

// The point$ stream represents the number of earned points by your favorite sports team for each played game during last season.

// ASSIGNMENT: Use the point$ stream to display the number of points for each game, including the total number of
// points earned so far. The output should be formatted as following:
//
//   Points: 5 - total: 11
//
// HINT: You will need to use `zip` (static creation operator) and `scan` (pipeable-operator).

const subtotals$ = zip(point$, point$.pipe(scan((acc, cur) => acc + cur))).pipe(
    map(x => {
        return `Points: ${x[0]} - total: ${x[1]}`;
    })
); // ???

// If implemented correctly, the application should display the following output:
//
// Points: 0 - total: 0
// Points: 3 - total: 3
// Points: 0 - total: 3
// Points: 3 - total: 6
// Points: 1 - total: 7
// Points: 3 - total: 10
// Points: 0 - total: 10
// Points: 0 - total: 10
// Points: 3 - total: 13
// Points: 0 - total: 13

checkSolution(subtotals$);
