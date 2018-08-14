import { Subject, concat, interval, merge, of, zip } from 'rxjs';
import { bufferCount, debounceTime, distinctUntilChanged, filter, map, mapTo, max, publishReplay, refCount, skip, startWith, take, withLatestFrom } from 'rxjs/operators'; // tslint:disable-line:max-line-length
import { reduce, scan } from '../lib/patched-rxjs-operators';
import { getTrainMetrics$ } from '../lib/example-streams';
import { checkSolution } from '../lib/solution-checker/index';

// In this exercise you will work with a stream of (simulated) train sensor data. This data is wrapped in a class called
// TrainMetrics, which has the following properties:
//  - trainId   Identifier of train for which the sensor data was recorded.
//  - timestamp Time at which the sensor data was recorded, stored as an epoch timestamp in milliseconds.
//  - position  Geographical coordinate that represents the location of the train at the time of the measurements.
//
// The trainMetrics$ stream below represents the data for a train that travels from one railway station to another. Although the
// data is simulated realistic values are emitted. To make this data practical for use with this exercise time has been
// artificially accelerated with a multiplier of 40x. Nonetheless you can still treat this data is if it was a real-time sensor data stream
// from a real train.
const trainMetrics$ = getTrainMetrics$();

// ASSIGNMENT: Compute the average velocity (in Km/h) of the train using the data from the trainMetrics$ stream. The average
// velocity should be updated in real-time so your output should again be a stream, only this time it should emit average velocity
// values. Compute the "real-time" velocity every time over a list of 10 subsequent TrainMetrics values emitted from the
// trainMetrics$ stream. Do this once out of every 5 times a value gets emitted from the trainMetrics$ stream.
//
// HINT: You can compute the average velocity for a list of subsequent TrainMetrics values by using only the first and last value
// from that list. The velocity is then computed by taking the difference between the position of the first and last element
// divided by the time difference between those to values.
//
// HINT: The distance (in meters) between two TrainMetrics values x and y can be computed as follows:
//  - x.position.distanceTo(y.position)
//
// HINT: Time difference (in seconds) between two TrainMetrics values x and y is computed in the following way:
//  - Math.abs(x.timestamp - y.timestamp) / 1000.0
//
// HINT: To convert a velocity in meters per second (m/s) to kilometers per hour (Km/h) multiple the velocity with 3.6

const averageVelocity$ = trainMetrics$; // ???

// When implemented correctly you should find a maximum velocity of ~ 140 Km/h.

const solution$ = averageVelocity$.pipe(publishReplay(), refCount());
checkSolution(concat(
    solution$,
    solution$.pipe(
        max(),
        map((maxVelocity) => `The train reached a maximum velocity of ~ ${Math.round(maxVelocity)} Km/h.`))
    )
);
