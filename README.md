# Workshop RxJS Demo

On the 10th of July, 2019, we organized a workshop together with craftmen. You can find the details [here](https://www.meetup.com/Amsterdam-Web-Components-Meetup/events/262381300/)

## Workshop source

Please refer to [https://gitlab.com/craftsmen/rxjs-workshop-craftsmen-2018-08-30](https://gitlab.com/craftsmen/rxjs-workshop-craftsmen-2018-08-30) to find the original workshop documents.
I have filled in most of the exercises in this repository.

## Webcomponents addition

I have added an example, in order to connect the RxJS Workshop to our meetup topic: Web components.
The context could be formulated by the following question:

    Can we make a dashboard website that changes on every event that our server sends us?

### Use case details

-   HTTP GET /currencies
    -   Spits out various valuta values
-   Using EventSource we listen for values
-   Create a RxJS Observable, and subscribe to..
-   Connect data into charts that react to changes

### Implementation details

We used:

-   NodeJS, and Express server that generates random values at some ‘mysterytimeTM’ to emit events.
-   Webpack (with dev-server) to build the single page app with babel and html loaders
-   Lit-Element, to build components
-   Highcharts component
-   Eventsource implementation

### Usage

To see the demo working, you can simply run:

`npm i & npm run demo`

The demo script, simply runs two other scripts.
To see seperate parts, please consider running them both.

Using `npm run server` you can start the code in `/api`.
You'll find the stream of events on `http://localhost:5000/currencies`

The application with RxJS streams and webcomponents is started by using the Webpack devserver:

Use `npm run devstart` to see the application started.

### Code

Next, you can inspect the sources, split up in three parts:

1. The _Server_ that spits out events, code is in `/api`.
2. The _RxJS Streams_ in `/src/rx`, and
3. A webapp with a single component.
   Look at the `/src/index.html` and the `/src/component`
