const sortASC = 'ASC';
const sortDESC = 'DESC';

const getSortingQuery = (order, sortColumns) => {
    const { key, dir } = order || {};

    if (!key) return null;

    if (!sortColumns.includes(key)) {
        return null;
    }

    const sortDir = (dir || '').toUpperCase() || sortASC;

    if (![sortASC, sortDESC].includes(sortDir)) return null;

    return [[`${key}`, `${dir} NULLS LAST`]];
};

module.exports = {
    getSortingQuery,
};
