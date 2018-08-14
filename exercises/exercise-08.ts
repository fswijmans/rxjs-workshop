import { Subject, concat, interval, merge, of, zip } from 'rxjs';
import { bufferCount, debounceTime, distinctUntilChanged, filter, map, mapTo, max, publishReplay, refCount, skip, startWith, take, withLatestFrom } from 'rxjs/operators'; // tslint:disable-line:max-line-length
import { reduce, scan } from '../lib/patched-rxjs-operators';
import { shape$ } from '../lib/example-streams';
import { checkSolution } from '../lib/solution-checker/index';

// The shape$ stream emits a sequence of varying shapes (circles, triangles, rectangles, etc.) and sizes.
//
// ASSIGNMENT: Display the CIRCUMFERENCE for all shapes whose SURFACE AREA is larger than 500.
//
// HINT: You do not need to compute the circumference and surface area yourself. Instead you can use the properties
// `shape.circumference` and `shape.area`, which are provided by all shapes in the stream.

const circumference$ = shape$; // ???

// If implemented correctly you should see the following values:
//   188.50, 251.33, 2000.00, 3600.00, 120.00, 145.21, 1400.00

checkSolution(circumference$);
