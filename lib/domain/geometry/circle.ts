import { Shape } from './shape';
import { almostEqual } from '../../solution-checker/util';

export class Circle implements Shape {

    constructor(
        public readonly name: string,
        public readonly radius: number
    ) { }

    public get area(): number {
        return Math.PI * this.radius * this.radius;
    }

    public get circumference(): number {
        return 2 * Math.PI * this.radius;
    }

    public equals(other: any): boolean {
        return (
            other instanceof Circle &&
            this.name === other.name &&
            almostEqual(this.radius, other.radius)
        );
    }

    public toString(): string {
        return `Circle(name='${this.name}', radius=${this.radius})`;
    }
}
