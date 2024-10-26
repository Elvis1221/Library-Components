const db = require('../models')();

const {
    Address,
} = db;

const buildAddressInclude = (as, attributes = []) => {
    return {
        model: Address,
        as,
        attributes,
    };
};

module.exports = {
    buildAddressInclude,
};
