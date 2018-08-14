export class Ingredient {

    constructor(
        public readonly name: string,
        public readonly type: string
    ) { }

    public equals(other: any): boolean {
        return (!!other) && this.name === other.name && this.type === other.type;
    }

}
