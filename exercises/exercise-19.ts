import { currencies$ } from "../src/rx/currency-streams";
import { pipe, timer, merge, combineLatest, zip } from "rxjs";
import { filter, scan, map, withLatestFrom } from "rxjs/operators";

/**
 * This file needs to become a exercise, now it is just a part of the solution.
 * Create a stream of the latest values of all emitted values
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

const seconds$ = timer(1000, 2000);

const namedCurrencies$ = currencies$.pipe(
    map((x: any) => {
        let o: any = {};
        o[x.iso] = x;
        o.currencies = [x.iso];
        return o;
    })
);

const test$ = namedCurrencies$
    .pipe(
        scan((acc: any, cur: any) => {
            let o = Object.assign({}, acc, cur);
            const key = cur.iso;
            o.currencies = arrayUnique(acc.currencies.concat(cur.currencies));
            return o;
        })
    )
    .pipe(
        map((x: any) => {
            let a: any = [];
            x.currencies.forEach((it: any) => {
                a.push(x[it]);
            });
            return a;
        })
    );

seconds$.pipe(withLatestFrom(test$)).subscribe((x: any) => {
    console.log(x);
});
