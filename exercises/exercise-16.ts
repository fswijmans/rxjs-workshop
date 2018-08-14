import { Subject, concat, interval, merge, of, zip } from 'rxjs';
import { bufferCount, debounceTime, distinctUntilChanged, filter, map, mapTo, max, publishReplay, refCount, skip, startWith, take, withLatestFrom } from 'rxjs/operators'; // tslint:disable-line:max-line-length
import { reduce, scan } from '../lib/patched-rxjs-operators';
import { personalCheckinsCheckouts$, travelCostMatrix } from '../lib/example-streams';
import { checkSolution } from '../lib/solution-checker/index';

const NO_CHECKOUT_COST = 20.0;

// Each check-in and check-out event is associated with an "OV chipkaart". The personalCheckinsCheckouts$ stream (imported above) represents
// the stream of check-in and check-out events for a single "OV chipkaart". For every check-in/out the railway station is recorded. This
// information can be used to compute the travel cost for a journey. The price for a journey from railway station A to B can be
// determined through the `travelCostMatrix` object (also imported above). It might be possible that someone forgets to check in or check
// out. This situation can be detected by two successive check-in events. In that case the travel cost is 20 euros.

// ASSIGNMENT: Given the personalCheckinsCheckouts$ of check-in and check-out events compute the cumulative travel cost. The resulting
// stream should emit the total travel cost for every new journey.
//
// HINT: To solve this exercise you will first need to find a method to obtain a stream of two successive gate check-in/out events.
//
// HINT: For each pair (a, b) of GateCheckEvents use the following rules to determine the travel cost:
//  - a.isCheckIn && b.isCheckOut  ->  costMatrix.getTravelCost(a.railwayStation, b.railwayStation)
//  - a.isCheckIn && b.isCheckIn   ->  NO_CHECKOUT_COST
//  - otherwise                    ->  Nothing. You can represent this using one of the following: undefined, null or 0

const travelCost$ = personalCheckinsCheckouts$; // ???

// When implemented correctly you should see the following output:
// 7.5, 19.0, 39.0, 46.5

checkSolution(travelCost$);
