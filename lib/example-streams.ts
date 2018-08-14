import { concat, throwError, Observable, merge, of, NEVER, EMPTY } from 'rxjs';
import { delay, publishReplay, refCount, take, timeout, catchError, bufferCount, filter, map } from 'rxjs/operators';

import { sampled } from './stream-utils';
import {
    Ingredient,
    Circle,
    Square,
    Rectangle,
    Triangle,
    Shape,
    GateCheckEvent,
    TravelCostMatrix,
    TrainMetrics,
    TrainSimulationParameters,
    CompositeTrainSimulation,
    StationaryTrainSimulation,
    TrainJourneySimulation,
    RailwayStation
} from './domain/index';

export const number$ = sampled(500, 1, 9, 4, 7, 6, 2, 2, 7, 3, 4, 8);

export const numbersAndAnError$ = concat(
    number$.pipe(take(4)),
    throwError('uh oh! an error!')
);

export const word$ = sampled(500, 'Jirble:', 'spill', 'a', 'liquid', 'by', 'shaking', 'or', 'unsteady', 'moving', 'of', 'the', 'vessel');

export const ingredient$ = sampled(500,
    new Ingredient('Flour', 'BASE'),
    new Ingredient('Sugar', 'SWEET'),
    new Ingredient('Strawberry', 'FRUIT'),
    new Ingredient('Salt', 'BASE'),
    new Ingredient('Pineapple', 'FRUIT')
);

export const shape$ = sampled<Shape>(500,
    new Circle('Circle 30', 30),
    new Circle('Circle 40', 40),
    new Square('Square 20', 20),
    new Rectangle('Rectangle 50x20', 50, 20),
    new Triangle('Triangle 40x10', 40, 10),
    new Rectangle('Rectangle 45x40', 45, 40),
    new Square('Square 30', 30),
    new Triangle('Triangle 40x45', 40, 45),
    new Rectangle('Rectangle 10x70', 10, 70)
);

export const point$ = sampled(500, 0, 3, 0, 3, 1, 3, 0, 0, 3, 0);

export const gateCheckEvent$ =
    merge(
        singleGateCheckEvent$(true,    233),
        singleGateCheckEvent$(true,    978),
        singleGateCheckEvent$(false,  1313),
        singleGateCheckEvent$(true,   2105),
        singleGateCheckEvent$(false,  3643),
        singleGateCheckEvent$(false,  4411),
        singleGateCheckEvent$(true,   5556),
        singleGateCheckEvent$(false,  8123),
        singleGateCheckEvent$(false,  9722),
        singleGateCheckEvent$(true,  10880),
        NEVER.pipe(timeout(14000), catchError(() => EMPTY))
    ).pipe(
        publishReplay(),
        refCount()
    );

function singleGateCheckEvent$(isCheckin: boolean, time: number): Observable<GateCheckEvent> {
    return of(new GateCheckEvent(isCheckin, new Date(Date.now() + time), 'AMR')).pipe(
        delay(time)
    );
}

export const personalCheckinsCheckouts$ = sampled(500,
    new GateCheckEvent(true,  new Date(2016, 12, 16, 8, 4, 11, 345), 'UTR'),
    new GateCheckEvent(false, new Date(2016, 12, 16, 8, 41, 3, 409), 'AMS'),
    new GateCheckEvent(true,  new Date(2016, 12, 16, 17, 44, 56, 122), 'AMS'),
    new GateCheckEvent(false, new Date(2016, 12, 16, 18, 49, 4, 123), 'DH'),
    new GateCheckEvent(true,  new Date(2016, 12, 16, 22, 15, 44, 616), 'DH'),
    new GateCheckEvent(true,  new Date(2016, 12, 17, 8, 3, 54, 883), 'UTR'),
    new GateCheckEvent(false, new Date(2016, 12, 17, 8, 39, 21, 512), 'AMS')
);

export const travelCostMatrix = new TravelCostMatrix()
    .addCostEntry('UTR', 'AMS', 7.50)
    .addCostEntry('UTR', 'DH', 11.00)
    .addCostEntry('DH', 'AMS', 11.50);

export function getTrainMetrics$(): Observable<TrainMetrics> {
    const simulationParameters: TrainSimulationParameters = {
        tickFrequency: 100,
        maxVelocity: 140 / 3.6,
        acceleration: 2 / 3.6,
        trainId: '1042',
        timeDilation: 40.0,
    };

    const simulation = new CompositeTrainSimulation(
        new StationaryTrainSimulation(RailwayStation.AMR.location, 60.0),
        new TrainJourneySimulation(RailwayStation.AMR.location, RailwayStation.UTR.location),
        new StationaryTrainSimulation(RailwayStation.UTR.location, 60.0)
    );

    return simulation.trainMetrics$(simulationParameters, Date.now());
}

export function getTrainVelocity$(trainMetrics$: Observable<TrainMetrics>): Observable<number> {
    return trainMetrics$.pipe(
        bufferCount(10, 5),
        filter((measurement) => measurement.length > 1),
        map(([first, ...rest]) => {
            const last = rest[rest.length - 1];
            const elapsedTime = last.timestamp - first.timestamp;
            const distance = last.position.distanceTo(first.position);
            const velocity = distance * 1000 / elapsedTime;

            return velocity;
        }),
        map((velocity) => velocity * 3.6)
    );
}
