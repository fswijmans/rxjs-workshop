import { number$ } from "../lib/example-streams";

// Use the number$ stream (imported above)
// It will emit short a sequence of numbers with an interval of 0.5 seconds.
//
// ASSIGNMENT: Subscribe to the number$ stream and print each number to the console.

number$.subscribe(console.log);
