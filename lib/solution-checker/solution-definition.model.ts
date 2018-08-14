export interface SolutionDefinition<T> {
    expectedEvents: ObservableEvent<T>[];
    equalityChecker?: EqualityChecker<T>;
    valueFormatter?: ValueFormatter;
    maxTimeDrift?: number;
}

export type EqualityChecker<T> = (actual: any, expected: T) => boolean;

export type ValueFormatter = (value: any) => string;

export enum TimestampType {
    ABSOLUTE = 'ABSOLUTE',
    DELTA = 'DELTA'
}

export class AbsoluteTimestamp {
    public readonly type = TimestampType.ABSOLUTE;
    constructor(public readonly value: number) {}
}

export class DeltaTimestamp {
    public readonly type = TimestampType.DELTA;
    constructor(public readonly value: number) {}
}

export type Timestamp = AbsoluteTimestamp | DeltaTimestamp;

export const Timestamp = {
    absolute: (value: number) => new AbsoluteTimestamp(value),
    delta: (value: number) => new DeltaTimestamp(value)
};

export enum ObservableEventType {
    NEXT = 'NEXT',
    ERROR = 'ERROR',
    COMPLETE = 'COMPLETE'
}

export class ObservableNextEvent<T> {
    public readonly type = ObservableEventType.NEXT;
    constructor(
        public readonly value: T,
        public readonly timestamp: Timestamp
    ) { }
}

export class ObservableErrorEvent {
    public readonly type = ObservableEventType.ERROR;
    constructor(
        public readonly error: any,
        public readonly timestamp: Timestamp
    ) { }
}

export class ObservableCompleteEvent {
    public readonly type = ObservableEventType.COMPLETE;
    constructor(
        public readonly timestamp: Timestamp
    ) { }
}

export type ObservableEvent<T> = ObservableNextEvent<T> | ObservableErrorEvent | ObservableCompleteEvent;

export const ObservableEvent = {
    next: <T>(value: T, timestamp: Timestamp) => new ObservableNextEvent(value, timestamp),
    error: (error: any, timestamp: Timestamp) => new ObservableErrorEvent(error, timestamp),
    complete: (timestamp: Timestamp) => new ObservableCompleteEvent(timestamp)
};
