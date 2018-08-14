import { Observable, from, interval, zip } from 'rxjs';
import { map } from 'rxjs/operators';

export function sampled<T>(period: number, ...values: T[]): Observable<T> {
    return zip(
        interval(period),
        from(values)
    ).pipe(
        map(([_, value]) => value)
    );
}
