export class GateCheckEvent {

    constructor(
        private readonly checkIn: boolean,
        public readonly timestamp: Date,
        public readonly railwayStation: string
    ) { }

    public get isCheckIn(): boolean {
        return this.checkIn;
    }

    public get isCheckOut(): boolean {
        return !this.checkIn;
    }

}
