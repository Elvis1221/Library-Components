const { formatDate } = require('../services/dates');

/**
 * Trim number to specific length, including dot, and convert to string.
 * Integers with size larger than trim length will not be trimmed.
 * @param {number|string} numericInput number or string parsable to number
 * @param {number} size
 * @returns {string} string representation of number, trimmed to requested length
 */
const trimNumberWithRounding = (numericInput, size) => {
    const num = typeof numericInput === 'number' ? numericInput : Number.parseFloat(numericInput);
    const str = typeof numericInput === 'string' ? numericInput : numericInput.toString();

    if (str.length <= size) {
        return str;
    }

    const floored = Math.floor(num);
    const rounded = Math.round(num);

    const isInteger = Number.isInteger(num);
    const flooredLength = floored.toString().length;

    // We can not trim integers without losing info, so just round
    if (isInteger || flooredLength > size) {
        return rounded.toString();
    }

    const fractionDigits = size - flooredLength - 1;
    const toFixedAttempt = num.toFixed(fractionDigits).toString();
    if (toFixedAttempt.length <= size) {
        return toFixedAttempt;
    }

    return num.toFixed(fractionDigits - 1).toString();
};

const formatMetadataRequest = item => {
    if (item.prototype.format === 'date' && item.value) {
        item.value = formatDate(item.value, 'LL');
    }

    return item;
};

module.exports = {
    trimNumberWithRounding,
    formatMetadataRequest,
};

