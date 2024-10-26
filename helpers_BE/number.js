const round = require('lodash.round');

function formatAsCurrency(number, afterPointFormat = '00') {
    if (!number) {
        return number;
    }
    const numberParse = number.toString().split('.');

    const arrBeforePoint = numberParse[0].split('');
    const afterPoint = numberParse[1] || null;

    let result = arrBeforePoint
        .reverse()
        .reduce((acc, item, index) => {
            if (index % 3 === 0) {
                acc.push(' ');
            }
            acc.push(item);
            return acc;
        }, [])
        .reverse()
        .join('')
        .trim();

    result = afterPoint && afterPoint !== afterPointFormat ? `${result}.${afterPoint}` : result;

    return result;
}

function nanToZero(x) {
    return isNaN(x) ? 0 : x;
}

function randomBetween(min, max) {
    const minInt = Math.ceil(min);
    const maxInt = Math.floor(max);
    return Math.floor(Math.random() * (maxInt - minInt)) + minInt;
}

function roundToPrecision(num, precision) {
    return round(num, precision);
}

function getPercent(part, total) {
    return total ? Math.round((part / total) * 100) : 0;
}

function getValueWithPercent(arr, total) {
    return arr.map((item, index) => {
        return {
            originalValue: item,
            value: item ? getPercent(item, total[index]) : 0,
        };
    });
}

/**
 * Multiplies the arguments specified after commas.
 * Non-numeric values will be ignored.
 * @param {Array<number|string>} args an array with numeric values
 * @returns {number}
 */
function multiply(...args) {
    return args.reduce((acc, value) => {
        if (isNaN(parseFloat(value)) || !isFinite(value)) return acc;
        return Number(acc) * Number(value);
    }, 1);
}

const convertMinutesToMs = value => value * 60 * 1000;

const positiveOrZero = x => { return x <= 0 ? 0 : x; };

const isNumber = value => typeof value === 'number';

const simpleRoundToPrecision = (number, precision = 2) => {
    if (!number) {
        return null;
    }

    const preparedNumber = Number(number).toFixed(precision);

    return preparedNumber;
};

module.exports = {
    formatAsCurrency,
    nanToZero,
    randomBetween,
    roundToPrecision,
    getPercent,
    getValueWithPercent,
    convertMinutesToMs,
    positiveOrZero,
    isNumber,
    multiply,
    simpleRoundToPrecision,
};
