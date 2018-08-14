import { Shape } from './shape';
import { almostEqual } from '../../solution-checker/util';

export class Rectangle implements Shape {

    constructor(
        public readonly name: string,
        public readonly width: number,
        public readonly height: number
    ) { }

    public get area(): number {
        return this.width * this.height;
    }

    public get circumference(): number {
        return 2 * this.width * this.height;
    }

    public equals(other: any): boolean {
        return (
            other instanceof Rectangle &&
            this.name === other.name &&
            almostEqual(this.width, other.width) &&
            almostEqual(this.height, other.height)
        );
    }

    public toString(): string {
        return `Rectangle(name='${this.name}', width=${this.width}, height=${this.height})`;
    }

}
