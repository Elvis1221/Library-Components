const { getUnique } = require('./array');

const DEFAULT_ACCOUNT_CURRENCY = 'EUR';

const getCurrencyCodesFromPrices = prices => {
    const currencyCodes = prices.reduce((acc, detailedCost) => {
        const {
            currency_code: currencyCode,
            detail_cost_history: detailsCostHistory,
        } = detailedCost;

        const codes = [];

        if ((detailsCostHistory || []).length) {
            detailsCostHistory.forEach(el => codes.push(el.currency_code));
        }

        codes.push(currencyCode);

        return acc.concat(codes);
    }, []);

    const uniqueCodes = getUnique(currencyCodes.filter(Boolean));

    return uniqueCodes;
};

module.exports = {
    DEFAULT_ACCOUNT_CURRENCY,
    getCurrencyCodesFromPrices,
};

