export class TravelCostMatrix {

    private readonly costMatrix = new Map<string, Map<string, number>>();

    public addCostEntry(from: string, to: string, cost: number): TravelCostMatrix {
        this.addOneWayCostEntry(from, to, cost);
        this.addOneWayCostEntry(to, from, cost);

        return this;
    }

    public getTravelCost(from: string, to: string): number {
        if (from === to) {
            return 0.0;
        }

        if (!this.costMatrix.has(from)) {
            throw new Error('No entry in travel expense matrix for starting railway station ' + from);
        }

        const destinationCosts = this.costMatrix.get(from)!;

        if (!destinationCosts.has(to)) {
            throw new Error('No entry in travel expense matrix for arrival railway station ' + to);
        }

        return destinationCosts.get(to)!;
    }

    private addOneWayCostEntry(from: string, to: string, cost: number): void {
        let entries = this.costMatrix.get(from);
        if (entries === undefined) {
            entries = new Map<string, number>();
            this.costMatrix.set(from, entries);
        }
        entries.set(to, cost);
    }
}
