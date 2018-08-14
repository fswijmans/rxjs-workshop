import { Subject, concat, interval, merge, of, zip } from 'rxjs';
import { bufferCount, debounceTime, distinctUntilChanged, filter, map, mapTo, max, publishReplay, refCount, skip, startWith, take, withLatestFrom } from 'rxjs/operators'; // tslint:disable-line:max-line-length
import { reduce, scan } from '../lib/patched-rxjs-operators';
import { word$ } from '../lib/example-streams';
import { checkSolution } from '../lib/solution-checker/index';

// The word$ stream (imported above) will emit a sequence words. Each word is just a string.
//
// ASSIGNMENT: Concatenate all the words from the word$ stream to form a sentence. Emit the final and intermediate
// results (the partial sentences) via the sentence$ stream.

const sentence$ = word$; // ???

// If implemented correctly you should now know what "jirble" means.

checkSolution(sentence$);
