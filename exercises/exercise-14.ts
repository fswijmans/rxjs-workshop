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
import { checkSolution } from "../lib/solution-checker/index";

// ASSIGNMENT: Create a Subject and make sure that the program prints the following output:
//  - after 1 second: RxJava is cool :)
//  - after 2 seconds: So reactive!
//  - after 3 seconds: Much stream!
//  - after 4 seconds: Goodbye!
// You are only allowed to modify the lines with the ??? comment. Do not change the other statements.
//
// HINT: Think of which kind of events your subject need to produce the desired output.
//
// HINT: If you look at the `checkSolution` line you'll see that "Goodbye!" will be appended after the subject 'completes', so think about
// which event you'll need to use for the 4th `setTimeout`.

const subject = new Subject<string>();

setTimeout(() => {
    subject.next("RxJava is cool :)");
}, 1000);

setTimeout(() => {
    subject.next("So reactive!");
}, 2000);

setTimeout(() => {
    subject.next("Much stream!");
}, 3000);

setTimeout(() => {
    subject.complete();
}, 4000);

checkSolution(concat(subject, of("Goodbye!")));
