const moment = require('moment');

const generateKey = () => {
    return +new Date();
};

const getFormatDecimal = value => {
    return (+value || 0).toFixed(3);
};

const getFormatDate = value => {
    if (!value) {
        return null;
    }
    return moment(value).format('YYYY-MM-DD');
};

const getFormatDateTime = value => {
    if (!value) {
        return null;
    }
    return moment(value).utc().format('YYYY-MM-DD HH:mm');
};

const getFormatData = (data, field, decimalFields = [], dateFileds = [], dateTimeFields = []) => {
    if (decimalFields.includes(field)) {
        return getFormatDecimal(data[field]);
    }

    if (dateFileds.includes(field)) {
        return getFormatDate(data[field]);
    }

    if (dateTimeFields.includes(field)) {
        return getFormatDateTime(data[field]);
    }

    return data[field];
};

const prepareDataToHistory = (fields, oldData, newData, decimalFields = [], dateFileds = [], dateTimeFields = []) => {
    let update = false;
    const data = fields.reduce((acc, field) => {
        if (typeof newData[field] !== 'undefined') {
            const newValue = getFormatData(newData, field, decimalFields, dateFileds, dateTimeFields);
            const oldValue = getFormatData(oldData, field, decimalFields, dateFileds, dateTimeFields);
            if (oldValue !== newValue) {
                update = true;
            }
        }
        acc[field] = oldData[field];

        return acc;
    }, {});
    return { data, update };
};

module.exports = {
    prepareDataToHistory,
    generateKey,
};
