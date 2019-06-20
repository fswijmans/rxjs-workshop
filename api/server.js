/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const express = require('express');
const currencyGenerator = require('./generator.js')
const {
    argv
} = require('yargs');

const MAIN_PORT = argv.mainPort || 5000;

/**
 *
 * Helper function to create random numbers used as interval ms.
 * Adjust 100 to alter the interval, but be careful to make it not to small.
 */
function mysteryTime() {
    return Math.floor(Math.random() * 1000);
}

/**
 * Function to generate currency event data at 'mystery time' interval, and
 * send that as response event to the requestor.
 *
 * using initialValue allows to set a first 'seed' for the generation,
 * every iteration, the last value is used as said seed.
 */
function sseCurrencyDemo(req, res, initialValue = 100) {
    let messageId = 0;
    let lastValue = initialValue;
    let time = mysteryTime();

    let timeoutId = setTimeout(function rec() {
        const data = currencyGenerator.generateCurrencyEventData(lastValue);
        res.write(`id: ${messageId} \n`);
        res.write(`data: ${JSON.stringify(data)} \n\n`);

        time = mysteryTime();
        messageId += 1;
        lastValue = data.value;
        timeoutId = setTimeout(rec, time);
    }, time);

    req.on('close', () => {
        clearTimeout(timeoutId);
    });
};

function startServer(port) {
    const server = express();
    server.listen(port);
    console.log(`Hello!\nYou can access the server's Hello World at http://localhost:${port}/, and \n find the stream of currency updates at http://localhost:${port}/currencies\n\nBest of luck!`);

    // Currency endpoint, will sent a stream of currency updates.
    server.use('/currencies', (req, res) => {
        res.writeHead(200, 'Stream is coming', {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
        });
        res.write('\n');
        sseCurrencyDemo(req, res);
    });

    // Hello world, sole purpose to show the server is running.
    server.use('/', (req, res) => res.send('Hello World!'));


    return server;
}

startServer(MAIN_PORT);

function exitHandler(options, err) {
    if (options.cleanup) {
        console.log('Bye bye');
    }
    if (err) console.log(err.stack);
    if (options.exit) process.exit();
}

// do something when app is closing
process.on('exit', exitHandler.bind(null, {
    cleanup: true
}));
// catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {
    exit: true
}));
// catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {
    exit: true
}));
/* once we exit, make sure we quit everything cleanly */
