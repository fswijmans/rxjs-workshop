var exports = module.exports = {};
/**
 * Function to generate some data of a currency.
 */
exports.generateCurrencyEventData = (seed = 0, min = 0, max = 200, numberOfDecimals = 3) => {
    const decimalMultiplier = 10 ** numberOfDecimals;
    const randomNumber = Math.random();
    const currency = exports._currencies[Math.floor(randomNumber * exports._currencies.length)];
    const value = Math.floor(((seed + randomNumber * (max - min) + min) / 2) * decimalMultiplier) / decimalMultiplier;
    const date = Date.now();

    return Object.assign(currency, {
        value,
        date
    });
};

/**
 * List of all the currencies used to be generated.
 */
exports._currencies = [{
        name: 'European Euro',
        iso: 'EUR',
        continent: 'Europe',
    },
    {
        name: 'US Dollar',
        iso: 'USD',
        continent: 'America',
    },
    {
        name: 'British Pound',
        iso: 'GBP',
        continent: 'Europe',
    },
    {
        name: 'Japanese Yen',
        iso: 'JPY',
        continent: 'Asia',
    },
    {
        name: 'Thai Baht',
        iso: 'BHT',
        continent: 'Asia',
    },
    {
        name: 'Malaysian Ringgit',
        iso: 'MYR',
        continent: 'Asia',
    },
    {
        name: 'Renminbi',
        iso: 'RMB',
        continent: 'Asia',
    },
];
