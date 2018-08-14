import { Observable, interval } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { TrainSimulation } from './train-simulation';
import { TrainMetrics } from './train-metrics';
import { LatLong } from './lat-long';
import { TrainSimulationParameters } from './train-simulation-parameters';

export class TrainJourneySimulation implements TrainSimulation {

    constructor(
        public readonly startPosition: LatLong,
        public readonly destinationPosition: LatLong
    ) {}

    public trainMetrics$(parameters: TrainSimulationParameters, startTime: number): Observable<TrainMetrics> {

        const totalDistance = this.startPosition.distanceTo(this.destinationPosition);

        const accelerationTime = parameters.maxVelocity / parameters.acceleration;
        const accelerationDistance = 0.5 * parameters.acceleration * accelerationTime * accelerationTime;

        // TODO adjust acceleration time and distance when unable to achieve max velocity for short distances.

        const unacceleratedDistance = totalDistance - 2 * accelerationDistance;
        const unacceleratedTime = unacceleratedDistance / parameters.maxVelocity;

        const totalTime = 2 * accelerationTime + unacceleratedTime;

        const tickDelay = 1000.0 / parameters.tickFrequency;

        const requiredNumberOfFrames = Math.ceil(totalTime * 1000 / (tickDelay * parameters.timeDilation));

        return interval(Math.round(tickDelay)).pipe(
            take(requiredNumberOfFrames),
            map((frameIndex) => {

                const elapsedTime = ((frameIndex + 1) * tickDelay) / 1000.0 * parameters.timeDilation;

                let distance;
                if (elapsedTime < accelerationTime) {
                    distance = 0.5 * parameters.acceleration * elapsedTime * elapsedTime;
                } else if (elapsedTime < unacceleratedTime + accelerationTime) {
                    distance = accelerationDistance + parameters.maxVelocity * (elapsedTime - accelerationTime);
                } else {
                    const t = Math.min(accelerationTime, elapsedTime - accelerationTime - unacceleratedTime);
                    distance = Math.min(totalDistance, accelerationDistance + unacceleratedDistance +
                        parameters.maxVelocity * t - 0.5 * parameters.acceleration * t * t);
                }

                const normalizedDistance = distance / totalDistance;

                const currentPosition = this.startPosition.interpolate(this.destinationPosition, normalizedDistance);

                return new TrainMetrics(parameters.trainId, startTime + Math.floor(elapsedTime * 1000), currentPosition);
            })
        );
    }
}
