const Sequelize = require('sequelize');
const diacritics = require('diacritics');
const escape = require('pg-escape');

const { forceArray } = require('./array');
const { MODES_TO_ID } = require('../lib/contents');

const IS = 'is';
const IS_NOT = 'is_not';
const IS_AFTER = 'is_after';
const IS_ON_AFTER = 'is_on_or_after';
const IS_BEFORE = 'is_before';
const IS_ON_BEFORE = 'is_on_or_before';
const GTE = 'gte';
const LTE = 'lte';
const GT = 'gt';
const LT = 'lt';
const BEETWEEN = 'beetween';
const CONTAINED = 'contained';
const NOT_CONTAINED = 'not_contained';
const CONTAINS = 'contains';
const EXCLUDES = 'excludes';
const NO_STATUS = 'no_status';

const ALIAS = {
    AS_ADDRESS_FROM: 'address_from',
    AS_ADDRESS_DEST: 'address_dest',
    AS_SHIPPER: 'shipper',
    AS_METADATA_REQUEST: 'metadata_request',
    AS_PROTOTYPE: 'prototype',
    AS_CARRIER: 'carrier',
    AS_QUOTE_REQUEST: 'quote_request',
    AS_PRE_SHIPMENT: 'pre_shipment',
    AS_PRE_SHIPMENTS: 'pre_shipments',
};

const SORT_ASC = 'ASC';
const SORT_DESC = 'DESC';

const buildSequelizeRule = (rule, value, formatOptions) => {
    const { toSubString } = formatOptions || {};

    const isArrayValue = Array.isArray(value);
    const isNullValue = value === null;

    switch (rule) {
        case IS:
            if (isNullValue) return '$is';

            return isArrayValue ? '$in' : '$eq';
        case IS_NOT:
            return isArrayValue ? '$notIn' : '$ne';
        case GTE:
            return '$gte';
        case LTE:
            return '$lte';
        case GT:
            return '$gt';
        case LT:
            return '$lt';
        case BEETWEEN:
            return '$beetween';
        case CONTAINED:
            return '$contained';
        case NOT_CONTAINED:
            // TODO make not_contained possibility
            return '$contained';
        case CONTAINS:
            return toSubString ? '$iLike' : '$eq';
        case EXCLUDES:
            return toSubString ? '$notILike' : '$ne';
        default:
            return '$in';
    }
};

const buildFilterCondition = ({ rule, value }, formatOptions) => {
    const sequelizeRule = buildSequelizeRule(rule, value, formatOptions);
    const { toNumber, toArray, toSubString, allowNull, nullField } = formatOptions || {};

    let formattedValue = value;

    if (toArray) {
        formattedValue = forceArray(value);
    }

    if (toNumber) {
        formattedValue = Array.isArray(value) ? value.map(Number).filter(Boolean) : Number(value);
    }

    if (toSubString) {
        formattedValue = `%${value}%`;
    }
    if (!formattedValue && !allowNull) return null;

    if (rule === IS_NOT && !forceArray(formattedValue).some(el => el === null)) {
        return {
            $or: [
                { [sequelizeRule]: formattedValue },
                null,
            ],
        };
    }
    if (rule === IS && nullField && forceArray(formattedValue).some(el => el === null)) {
        return {
            $or: [
                { [sequelizeRule]: formattedValue.filter(Boolean) },
                null,
            ],
        };
    }

    return { [sequelizeRule]: formattedValue };
};

const buildWhereInForField = (fieldName, ids) => {
    if (!ids.length) {
        return {
            [fieldName]: ids,
        };
    }
    const mappedIds = ids.map(i => `(${i})`).join(',');

    return Sequelize.literal(`${fieldName} IN (VALUES ${mappedIds})`);
};

const formatStringWithDiacritics = str => {
    return str
        .toLowerCase()
        .replace(/[()*,[,\]]/gi, '')
        .split('')
        .reduce((acc, value) => {
            const newWord = diacritics.diacriticsMap[value] ? `(${value}|${diacritics.diacriticsMap[value]})` : value;
            return acc.concat(newWord);
        }, '');
};

const buildSearchStrWithDiacritics = str => {
    const formattedString = formatStringWithDiacritics(str);

    return `%${formattedString}%`;
};

const buildSimilarToSearchQuery = (colName, searchQuery) => {
    return Sequelize.literal(escape(`LOWER(${colName}) SIMILAR TO %L`, searchQuery));
};

const buildSearchCompleteMatchStrWithDiacritics = str => {
    const formattedString = formatStringWithDiacritics(str);

    return formattedString;
};

const buildEqualSearchQuery = (colName, searchQuery) => {
    return Sequelize.literal(escape(`LOWER(${colName}) = %L`, searchQuery));
};

/**
 *
 * @param {*} filters
 * @param {*} modelAddress
 * @param {*} parentTable
 * @param {*} addressIncludeNames { from: <'from_address','address_from',...> , dest: ... }
 * @returns
 */
const buildAddressIncludeWhere = (filters, modelAddress, parentTable, addressIncludeNames) => {
    const {
        departureCountries,
        departureLogzones,
        departureZipcodes,
        departureInternalCode,
        arrivalCountries,
        arrivalLogzones,
        arrivalZipcodes,
        arrivalInternalCode,
    } = filters;

    const {
        from,
        dest,
    } = addressIncludeNames || {};

    const addressFromKey = from || 'address_from';
    const addressDestKey = dest || 'address_dest';

    const include = [];
    const whereAnd = [];
    const parentTablePart = parentTable
        ? `${parentTable}.`
        : '';

    // FROM address
    if ((departureCountries || departureLogzones || departureZipcodes || departureInternalCode) && modelAddress) {
        include.push({
            model: modelAddress,
            as: addressFromKey,
            attributes: [],
        });
    }

    if (departureCountries) {
        whereAnd.push({
            [`$${parentTablePart}${addressFromKey}.country_code_alpha2$`]: buildFilterCondition(departureCountries),
        });
    }

    if (departureLogzones) {
        whereAnd.push({
            [`$${parentTablePart}${addressFromKey}.logistic_zone$`]: buildFilterCondition(departureLogzones),
        });
    }

    if (departureZipcodes) {
        whereAnd.push({
            [`$${parentTablePart}${addressFromKey}.zipcode$`]: buildFilterCondition(departureZipcodes),
        });
    }

    if (departureInternalCode) {
        whereAnd.push({
            [`$${parentTablePart}${addressFromKey}.internal_code$`]: buildFilterCondition(departureInternalCode),
        });
    }

    // DEST address
    if ((arrivalCountries || arrivalLogzones || arrivalZipcodes || arrivalInternalCode) && modelAddress) {
        include.push({
            model: modelAddress,
            as: addressDestKey,
            attributes: [],
        });
    }

    if (arrivalCountries) {
        whereAnd.push({
            [`$${parentTablePart}${addressDestKey}.country_code_alpha2$`]: buildFilterCondition(arrivalCountries),
        });
    }

    if (arrivalLogzones) {
        whereAnd.push({
            [`$${parentTablePart}${addressDestKey}.logistic_zone$`]: buildFilterCondition(arrivalLogzones),
        });
    }

    if (arrivalZipcodes) {
        whereAnd.push({
            [`$${parentTablePart}${addressDestKey}.zipcode$`]: buildFilterCondition(arrivalZipcodes),
        });
    }

    if (arrivalInternalCode) {
        whereAnd.push({
            [`$${parentTablePart}${addressDestKey}.internal_code$`]: buildFilterCondition(arrivalInternalCode),
        });
    }

    return {
        include,
        whereAnd,
    };
};

const buildRelationCondition = (currentWhereAnd, filtersWhere, relation) => {
    // TODO: Take a relation from an another place
    if (relation === 'OR') {
        currentWhereAnd.push({ $or: filtersWhere });

        return currentWhereAnd;
    }

    if (relation === 'AND') {
        return (currentWhereAnd || []).concat(filtersWhere);
    }

    return currentWhereAnd;
};

const buildDateFilterCondition = (data, field) => {
    const { rule } = data;
    const { from, to } = data.value;
    let sequelizeRuleFrom;
    let sequelizeRuleTo;
    let rel;
    let sequelizeRule;
    let date;

    if (rule === IS) {
        if (from && to) {
            sequelizeRuleFrom = buildSequelizeRule(GTE, from);
            sequelizeRuleTo = buildSequelizeRule(LTE, to);
            rel = '$and';
        } else {
            // filterByDepartureFrom in shipments list
            date = from || to;
            sequelizeRule = buildSequelizeRule(GT, date);
        }
    }

    if (rule === IS_NOT) {
        if (from && to) {
            sequelizeRuleFrom = buildSequelizeRule(LT, from);
            sequelizeRuleTo = buildSequelizeRule(GT, to);
            rel = '$or';
        } else {
            date = from || to;
            sequelizeRule = buildSequelizeRule(GT, date);
        }
    }

    if (rule === IS_AFTER) {
        date = to || from;
        sequelizeRule = buildSequelizeRule(GT, date);
    }

    if (rule === IS_ON_AFTER) {
        date = from || to;
        sequelizeRule = buildSequelizeRule(GTE, date);
    }

    if (rule === IS_BEFORE) {
        date = from || to;
        sequelizeRule = buildSequelizeRule(LT, date);
    }

    if (rule === IS_ON_BEFORE) {
        date = to || from;
        sequelizeRule = buildSequelizeRule(LTE, date);
    }

    if (sequelizeRule) {
        return {
            [field]: {
                [sequelizeRule]: date,
            },
        };
    }

    return {
        [field]: {
            [rel]: {
                [sequelizeRuleFrom]: from,
                [sequelizeRuleTo]: to,
            },
        },
    };
};

const buildForCarriersCondition = ({ rule, value }) => {
    const forCarrierParts = forceArray(value).map(id => `%"${id}":{"on":true%`);

    const forCarriersCondition = rule === IS
        ? { $iLike: { $any: forCarrierParts } }
        : { $and: forCarrierParts.map(el => ({ $notILike: el })) };

    return forCarriersCondition;
};

const buildAllowedAccountFilterCondition = (data, accountIds, isForCarriers) => {
    if (!data) {
        return null;
    }

    const { rule, value } = data;
    const valueInNumbers = forceArray(value).map(el => Number(el)).filter(Boolean);
    let accountIdsForQuery = [];

    if (rule === IS_NOT) {
        accountIdsForQuery = accountIds.filter(el => !valueInNumbers.includes(el));
    }

    if (rule === IS) {
        accountIdsForQuery = accountIds.filter(el => valueInNumbers.includes(el));
    }

    if (!accountIdsForQuery.length) {
        return null;
    }

    const dataForCondition = { rule: IS, value: accountIdsForQuery };

    if (isForCarriers) {
        return buildForCarriersCondition(dataForCondition);
    }

    return buildFilterCondition(dataForCondition);
};

const buildAccountEntityFilterQuery = inputFilteredEntites => {
    const { value, rule } = inputFilteredEntites;

    const arrayValues = forceArray(value || []);
    const hasEmpty = arrayValues.includes('none');
    const filteredEntites = arrayValues
        .map(Number)
        .filter(Boolean);

    if (!hasEmpty && !filteredEntites.length) {
        return null;
    }

    const fieldCondition = rule === IS ? '$or' : '$and';

    const accountEntityQuery = {
        [fieldCondition]: {},
    };

    if (hasEmpty) {
        const hasEmptyFilter = buildFilterCondition({ rule, value: null });

        Object.assign(accountEntityQuery[fieldCondition], hasEmptyFilter);
    }

    if (filteredEntites.length) {
        const formattedFilterEntities = Object.assign({}, inputFilteredEntites, { value: filteredEntites });

        Object.assign(
            accountEntityQuery[fieldCondition],
            buildFilterCondition(formattedFilterEntities, { toNumber: true }),
        );
    }

    return accountEntityQuery;
};

const buildJsonbQueryForExcludesValues = (field, array) => {
    const preparedArray = array.map(el => {
        return Sequelize.literal(`NOT ${field} @> '["${el}"]'`);
    });

    return preparedArray;
};

/**
 *
 * @param {*} fieldName name of the field to be passed to sql
 * @param {*} orderArray array of string value in needed order
 * @returns
 */
const buildOrderQueryByArray = (fieldName, orderArray) => {
    const buildWhereLine = (fieldValue, index) => (`WHEN ${fieldName} = '${fieldValue}' THEN ${index}`);

    return `CASE ${orderArray.map((el, i) => buildWhereLine(el, i)).join(' ')} ELSE ${orderArray.length + 1} END`;
};

const buildFilterByMode = (filterMode, key = 'shipment_mode_id') => {
    const modes = Array.isArray(filterMode.value) ? filterMode.value : (filterMode.value || '').split(',');
    const modeIds = modes
        .map(mode1 => MODES_TO_ID[mode1])
        .filter(id => !!id);

    const formattedFilterMode = Object.assign({}, filterMode, { value: modeIds });

    return {
        [key]: buildFilterCondition(formattedFilterMode, { toNumber: true }),
    };
};

const buildSortingDateShRequestQuery = (key, dir) => {
    if (!key) {
        return null;
    }

    const sortDir = (dir || '').toUpperCase() || SORT_ASC;

    if (![SORT_ASC, SORT_DESC].includes(sortDir)) {
        return null;
    }

    if (key === 'arrivalDate') {
        return [
            Sequelize.fn('COALESCE',
                Sequelize.col('"ShipmentRequest"."rta"'),
                Sequelize.col('"ShipmentRequest"."eta"'),
                Sequelize.col('"ShipmentRequest"."arrival_date_from"'),
            ),
            `${sortDir} NULLS LAST`,
        ];
    }

    if (key === 'departureDate') {
        return [
            Sequelize.fn('COALESCE',
                Sequelize.col('"ShipmentRequest"."rtd"'),
                Sequelize.col('"ShipmentRequest"."etd"'),
                Sequelize.col('"ShipmentRequest"."shipping_date_from"'),
            ),
            `${sortDir} NULLS LAST`,
        ];
    }

    return null;
};

const buildQueryWhereParameter = list => {
    if (!Array.isArray(list)) {
        return list;
    }
    if (list.length === 1) {
        return list[0];
    }
    return { $in: list };
};

module.exports = {
    IS,
    IS_NOT,
    IS_ON_BEFORE,
    CONTAINED,
    NOT_CONTAINED,
    EXCLUDES,
    NO_STATUS,

    ALIAS,

    SORT_ASC,
    SORT_DESC,

    buildSequelizeRule,
    buildWhereInForField,
    buildSearchStrWithDiacritics,
    buildSearchCompleteMatchStrWithDiacritics,
    buildSimilarToSearchQuery,
    buildEqualSearchQuery,
    buildAddressIncludeWhere,
    buildFilterCondition,
    buildRelationCondition,
    buildDateFilterCondition,
    buildAllowedAccountFilterCondition,
    buildForCarriersCondition,
    buildAccountEntityFilterQuery,
    buildJsonbQueryForExcludesValues,
    buildOrderQueryByArray,
    buildFilterByMode,
    buildSortingDateShRequestQuery,
    buildQueryWhereParameter,
};
