import { Observable } from 'rxjs';
import { TrainSimulationParameters } from './train-simulation-parameters';
import { TrainMetrics } from './train-metrics';

export interface TrainSimulation {
    trainMetrics$(parameters: TrainSimulationParameters, startTime: number): Observable<TrainMetrics>;
}
