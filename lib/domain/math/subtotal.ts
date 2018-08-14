export class Subtotal {

    constructor(
        public readonly count: number = 0,
        public readonly sum: number = 0
    ) {}

    public add(value: number): Subtotal {
        return new Subtotal(this.count + 1, this.sum + value);
    }

}
