import { currencies$ } from "./currency-streams.ts";
import { timer } from "rxjs";
import { filter, scan, map, withLatestFrom } from "rxjs/operators";

const fOnAsianContent = ({ continent }: any) => {
    return continent == "Asia";
};

/**
 * The following stream
 * - reformats events into a named datastructure (object)
 * - aggregates events per name (e.g. its iso code) by scanning
 * - and, formats to an array of currency values.
 */
const aggregateNamedCurrencies$ = currencies$
    //.pipe(filter(fOnAsianContent))
    .pipe(
        map((x: any) => {
            let o: any = {};
            o[x.iso] = x;
            o.currencies = [x.iso];
            return o;
        }),
        scan((acc: any, cur: any) => {
            let o = Object.assign({}, acc, cur);
            o.currencies = arrayUnique(acc.currencies.concat(cur.currencies));
            return o;
        }),
        map((x: any) => {
            let a: any = [];
            x.currencies.forEach((it: any) => {
                a.push(x[it]);
            });
            return a;
        })
    );

/**
 * The ticketCurrencies stream brings a steady pace to the aggregateNamedCurrencies, by using a timer.
 * Also, after taking latest from the timer and currency values, we drop the ticks.
 */
export const tickedCurrencies$ = timer(0, 200).pipe(
    withLatestFrom(aggregateNamedCurrencies$),
    map(x => x[1])
);

/**
 * Helper function to make an array unique
 */
function arrayUnique(array: any) {
    var a = array.concat();
    for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j]) a.splice(j--, 1);
        }
    }
    return a;
}
