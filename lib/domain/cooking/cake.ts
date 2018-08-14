import { intersectionWith } from 'lodash';

import { Ingredient } from './ingredient';

export class Cake {

    constructor(
        public readonly name: string,
        public readonly ingredients: Ingredient[] = [],
        public readonly baked: boolean = false
    ) { }

    public addIngredient(ingredient: Ingredient): Cake {
        if (this.baked) {
            throw new Error('Nope. You cannot add any ingredients after the cake has been baked.');
        }

        return new Cake(this.name, [...this.ingredients, ingredient], this.baked);
    }

    public bake(): Cake {
        if (!this.ingredients.length) {
            throw new Error('Trying to serve "gebakken lucht"? Add some ingredients before baking the cake!');
        }
        if (this.baked) {
            throw new Error('Oops, you\'ve baked the cake again, now it is burned!');
        }

        return new Cake(this.name, this.ingredients, true);
    }

    public toString(): string {
        return [
            this.name + ':',
            ...this.ingredients.map((ingredient) => ingredient.name.toLowerCase()),
            this.baked ? '- freshly baked, om nom nom!' : '- still uncooked :('
        ].join(' ');
    }

    public equals(other: any): boolean {
        return (
            !!other &&
            setEquals(this.ingredients, other.ingredients) &&
            this.baked === other.baked
        );
    }
}

function setEquals(first: any[], second: any[]): boolean {
    return (
        Array.isArray(first) &&
        Array.isArray(second) &&
        first.length === second.length &&
        intersectionWith(first, second, objectEquals).length === first.length
    );
}

function objectEquals(first: any, second: any): boolean {
    if (typeof first.equals === 'function') {
        return first.equals(second);
    }

    return first === second;
}
