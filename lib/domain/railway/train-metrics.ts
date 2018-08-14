import * as moment from 'moment';
import { LatLong } from './lat-long';

export class TrainMetrics {

    constructor(
        public readonly trainId: string,
        public readonly timestamp: number,
        public readonly position: LatLong
    ) { }

    public toString(): string {
        return [
            `( trainId = ${this.trainId}`,
            `time = ${moment(this.timestamp).format('HH:mm:ss.SSS dd-MM-YYYY') }`,
            `position = ${this.position}`
        ].join(', ');
    }
}
