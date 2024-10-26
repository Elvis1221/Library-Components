const { parsePhoneNumber, isValidPhoneNumber: isValidNumber } = require('libphonenumber-js/mobile');

const preparePhoneNumber = number => {
    if (!number) return number;

    let phoneNumber = number;

    if (!isValidNumber(number)) {
        phoneNumber = `+${number}`;
    }

    try {
        return parsePhoneNumber(phoneNumber).format('E.164');
    } catch (error) {
        return null;
    }
};

const isValidPhoneNumber = number => {
    if (!number) return true;

    if (isValidNumber(number)) return true;

    if (isValidNumber(`+${number}`)) return true;

    return false;
};

module.exports = {
    preparePhoneNumber,
    isValidPhoneNumber,
};
