import { Observable, Subject, Observer } from 'rxjs';
import { TrainSimulation } from './train-simulation';
import { TrainMetrics } from './train-metrics';
import { TrainSimulationParameters } from './train-simulation-parameters';

export class CompositeTrainSimulation implements TrainSimulation {

    private readonly simulations: TrainSimulation[];

    constructor(...simulations: TrainSimulation[]) {
        this.simulations = simulations;
    }

    public trainMetrics$(parameters: TrainSimulationParameters, startTime: number): Observable<TrainMetrics> {

        const publisher = new Subject<TrainMetrics>();

        this.concatNextSimulation(this.simulations, publisher, parameters, startTime);

        return publisher.asObservable();
    }

    public concatNextSimulation(
        simulations: TrainSimulation[],
        observer: Observer<TrainMetrics>,
        parameters: TrainSimulationParameters,
        startTime: number
    ): void {
        if (!simulations.length) {
            observer.complete();

            return;
        }

        const [simulation, ...rest] = simulations;
        let nextStartTime = startTime;

        simulation.trainMetrics$(parameters, nextStartTime).subscribe({
            next: (metrics) => {
                nextStartTime = metrics.timestamp;
                observer.next(metrics);
            },
            error: (error) => observer.error(error),
            complete: () => this.concatNextSimulation(rest, observer, parameters, nextStartTime)
        });
    }
}
