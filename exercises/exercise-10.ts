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
import { shape$ } from "../lib/example-streams";
import { checkSolution } from "../lib/solution-checker/index";
import { Subtotal } from "../lib/domain";

// ASSIGNMENT: Compute the average surface area for all shapes that are emitted by the shape$ stream. Store the final
// and intermediate results in the averageArea$ stream. Use both the scan and map operator for this assignment.
//
// HINT: Use the Subtotal class as a storage for the sum of the surface area and the number of shapes. This class has the following API:
//  * new Subtotal()      - Constructor to create a new Subtotal object whose count and sum are both initialized to 0.
//  * subtotal.add(value) - Adds `value` to the sum and increases count by 1.
//  * subtotal.sum        - The sum of all values that have been added using the `add(value)` function.
//  * subtotal.count      - The number of values which have been added, i.e. the number of times `add(value)` has been invoked.

const averageArea$ = shape$.pipe(
    scan((acc, cur) => {
        return acc.add(cur.area);
    }, new Subtotal()),
    map(subtotal => {
        return subtotal.sum / subtotal.count;
    })
); // ???

// If implemented correctly you should see the following values:
//   2827.43, 3926.99, 2751.33, 2313.50, 1890.80, 1875.66, 1736.28, 1631.75, 1528.22

checkSolution(averageArea$);
