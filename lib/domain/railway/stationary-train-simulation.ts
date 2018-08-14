import { Observable, interval } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { TrainSimulation } from './train-simulation';
import { TrainMetrics } from './train-metrics';
import { LatLong } from './lat-long';
import { TrainSimulationParameters } from './train-simulation-parameters';

export class StationaryTrainSimulation implements TrainSimulation {

    constructor(
        public readonly position: LatLong,
        public readonly stationaryTime: number
    ) {}

    public trainMetrics$(parameters: TrainSimulationParameters, startTime: number): Observable<TrainMetrics> {

        const tickDelay = 1000.0 / parameters.tickFrequency;

        const requiredNumberOfFrames = Math.ceil(this.stationaryTime * 1000 / (tickDelay * parameters.timeDilation));

        return interval(Math.round(tickDelay)).pipe(
            take(requiredNumberOfFrames),
            map((frameIndex) => {
                const elapsedTime = ((frameIndex + 1) * tickDelay) / 1000.0 * parameters.timeDilation;

                return new TrainMetrics(parameters.trainId, startTime + Math.floor(elapsedTime * 1000), this.position);
            })
        );
    }
}
