import { Shape } from './shape';
import { almostEqual } from '../../solution-checker/util';

export class Triangle implements Shape {

    constructor(
        public readonly name: string,
        public readonly base: number,
        public readonly height: number
    ) { }

    public get area(): number {
        return this.base * this.height / 2;
    }

    public get circumference(): number {
        return this.base + this.height + Math.sqrt(this.base * this.base + this.height * this.height);
    }

    public equals(other: any): boolean {
        return (
            other instanceof Triangle &&
            this.name === other.name &&
            almostEqual(this.base, other.base) &&
            almostEqual(this.height, other.height)
        );
    }

    public toString(): string {
        return `Triangle(name='${this.name}', base=${this.base}, height=${this.height})`;
    }
}
