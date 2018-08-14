import { Shape } from './shape';
import { almostEqual } from '../../solution-checker/util';

export class Square implements Shape {

    constructor(
        public readonly name: string,
        public readonly size: number
    ) { }

    public get area(): number {
        return this.size * this.size;
    }

    public get circumference(): number {
        return 4 * this.size;
    }

    public equals(other: any): boolean {
        return (
            other instanceof Square &&
            this.name === other.name &&
            almostEqual(this.size, other.size)
        );
    }

    public toString(): string {
        return `Square(name='${this.name}', size=${this.size})`;
    }
}
