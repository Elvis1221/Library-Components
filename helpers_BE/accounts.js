const { getUniqueArray } = require('./array');

const getUniquePartnerIds = (partnerAccounts, user) => {
    const partnerAccountIds = (partnerAccounts || []).map(el => {
        return user.account_id === el.account_id ? el.partner_account_id : el.account_id;
    });
    partnerAccountIds.push(user.account_id);

    return getUniqueArray(partnerAccountIds);
};

module.exports = {
    getUniquePartnerIds,
};
