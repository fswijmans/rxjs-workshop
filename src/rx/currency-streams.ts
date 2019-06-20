import { Observable } from "rxjs";
import * as EventSource from "eventsource";

/**
 * Listen to /currencies with an EventSource, and transform it into a RxJS Observable.
 */
export const currencies$ = Observable.create(observer => {
    const eventSource = new EventSource("/currencies");

    eventSource.onmessage = x => observer.next(JSON.parse(x.data));
    eventSource.onerror = x => observer.error(x);

    return () => {
        eventSource.close();
    };
});
