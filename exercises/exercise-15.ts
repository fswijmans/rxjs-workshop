import { Subject, concat, interval, merge, of, zip, combineLatest } from "rxjs";
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
import { gateCheckEvent$ } from "../lib/example-streams";
import { checkSolution } from "../lib/solution-checker/index";

const GATE_OCCUPY_TIME = 1500;

// With the introduction of the "OV chipkaart" in the Netherlands, every person that wishes to travel by train needs to
// check in and check out with their "OV chipkaart". Many railway stations have adopted gates which (in the future) can
// only be opened by either checking in or checking out. The gateCheckEvent$ stream below represents the checkins and
// checkouts for such a gate at a railway station.

// ASSIGNMENT: Define the gateIsFree$ stream based on the provided gateCheckEvent$. This stream should emit boolean
// values, where true indicates that the gate is free and false indicates that is occupied (being used by someone).
//
// Note that the stream should emit alternating values, i.e. two successive values may not be the same. For example,
// "true, true, false" is not a valid output, while "true, false, true" is okay.
//
// A gate is considered to be free if in the last 1,5 seconds nobody has checked in or out. Initially the gate is
// considered to be free, so your output should always start with "true".
//
// HINT: To specify the 1,5 second interval use the GATE_OCCUPY_TIME constant.
//
// HINT: Solve this assignment using divide and conquer. First try to define two streams, one that tells whenever the
// gate is occupied and another that tells when the gate is free. Next find a way to combine those streams to get the
// desired output.

const gateIsFree$ = gateCheckEvent$; // ???

// When implemented correctly you should see the following output:
// free, occupied, free, occupied, free, occupied, free, occupied, free

checkSolution(gateIsFree$.pipe(map(free => (free ? "free" : "occupied"))));
