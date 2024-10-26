const { forceArray } = require('./array');

const FILTER_SIMPLE_RULE = 'is';
const FILTER_SIMPLE_DATE_FROM = 'gte';
const FILTER_SIMPLE_DATE_TO = 'lte';
const FILTER_SIMPLE_STRING = 'contains';
const FILTER_SIMPLE_JSON = 'contained';

const FILTER_VALUE_NONE = 'none';
const NO_STATUS = 'no_status';

const ADVANCED_FILTERS = 'filters';
const ALLOWED_FILTER_FIELDS = [
    'shipment_ids',
    'allowed_shippers_ids',
    'accounting_entity_id',
    'address_id',
    'arrivalCountries',
    'arrivalIds',
    'arrival_ids',
    'arrivalLogzones',
    'arrivalZipcodes',
    'bookerIds',
    'carrierIds',
    'departureCountries',
    'departureIds',
    'departure_ids',
    'departureLogzones',
    'departureZipcodes',
    'direction',
    'mode',
    'status',
    'tag_list',
    'lineStatuses',
    'lineStatus',
    'tagIds',
    'orderDirection',
    'orderStatuses',
    'orderStatus',
    'orderType',
    'magicSearch',
    'magic_search',
    'subStatus',
    'carrier_id',
    'shipper_id',
    'dateTypeFilterKey',
    'milkrunStatus',
    'carrier_division_id',
    'externalShipperIds',
    'isExpedition',
    'isReception',
    'range',
    'entity_ids',
    'carrier_ids',
    'shipper_ids',
    'attType',
    'last_deliveries',
    'mode_ids',
    'zone_id',

    'trackingArrivalFrom',
    'trackingArrivalTo',
    'trackingDepartureFrom',
    'trackingDepartureTo',
    'dateFrom',
    'dateTo',
    'start_date',
    'end_date',
    'arrivalDate',
    'departureDate',
    'start',
    'end',
    'startDate',
    'endDate',
    'date_time_from',
    'date_time_to',
    'showOnlyReadyToShip',
    'showOnlyUpdated',
    'arrivalZoneIds',
    'departureZoneIds',
    'arrivalZoneDockDoorIds',
    'departureZoneDockDoorIds',
];

const FILTER_DATES_FROM = [
    'trackingArrivalFrom',
    'trackingDepartureFrom',
    'startDate',
    'start',
    'start_date',
    'dateFrom',
    'date_time_from',
];

const FILTER_DATES_TO = [
    'trackingArrivalTo',
    'trackingDepartureTo',
    'endDate',
    'end',
    'end_date',
    'dateTo',
    'date_time_to',
];

const DATES_STRUCTURE = {
    departureDateFrom: {
        key: 'departureDate',
        value: 'from',
    },
    departureDateTo: {
        key: 'departureDate',
        value: 'to',
    },
    arrivalDateFrom: {
        key: 'arrivalDate',
        value: 'from',
    },
    arrivalDateTo: {
        key: 'arrivalDate',
        value: 'to',
    },
};

const FILTER_JSON = [
    'subStatus',
];

const FILTER_STRING = [
    'magicSearch',
    'magic_search',
];

// add here <key>:<entity> pair to load extended data except of ids, refer ALLOWED_FILTER_FIELDS is needed
const ENTITY_ACCOUNTING = 'accounting';
const ENTITY_ADDRESS = 'address';
const ENTITY_LOCATION_ZONE = 'locationZone';
const ENTITY_LOCATION_ZONE_DOCK_DOOR = 'locationZoneDockDoor';
const ENTITY_CARRIER = 'carrier';
const ENTITY_SHIPPER = 'shipper';
const ENTITY_TAG = 'tag';
const ENTITY_USER = 'user';

const FILTER_KEYS_TO_ENTITIES = {
    accounting_entity_id: ENTITY_ACCOUNTING,
    arrivalIds: ENTITY_ADDRESS,
    departureIds: ENTITY_ADDRESS,
    externalShipperIds: ENTITY_SHIPPER,
    carrierIds: ENTITY_CARRIER,
    carrier_id: ENTITY_CARRIER,
    carrier_ids: ENTITY_CARRIER,
    shipper_id: ENTITY_SHIPPER,
    shipper_ids: ENTITY_SHIPPER,
    tag_list: ENTITY_TAG,
    tagIds: ENTITY_TAG,
    bookerIds: ENTITY_USER,
    trackingIds: ENTITY_ADDRESS,
    departureZoneIds: ENTITY_LOCATION_ZONE,
    arrivalZoneIds: ENTITY_LOCATION_ZONE,
    departureZoneDockDoorIds: ENTITY_LOCATION_ZONE_DOCK_DOOR,
    arrivalZoneDockDoorIds: ENTITY_LOCATION_ZONE_DOCK_DOOR,
};
//

const FILTER_DUPLICATE_POSTFIX = ' - Duplicate';
const FILTER_DUPLICATE_REGEX = / - Duplicate( \(\d+\))?$/;
const FILTER_DUPLICATE_NUMBER_REGEX = / - Duplicate( \((?<number>\d+)\))?$/mg;

const FILTER_SORT_KEY = {
    TAG: 'tag',
    ARRIVAL_DATE: 'arrivalDate',
    DEPARTURE_DATE: 'departureDate',
    DESC: 'DESC',
    ASC: 'ASC',
};

const convertSimpleDatesToAdvancedStructure = input => {
    const formattedInput = Object.assign({}, input);

    Object.keys(DATES_STRUCTURE).forEach(key => {
        if (!formattedInput[key]) return;

        const { key: newKey, value } = DATES_STRUCTURE[key];

        formattedInput[newKey] = formattedInput[newKey] || {};

        formattedInput[newKey][value] = formattedInput[key];

        delete formattedInput[key];
    });

    return formattedInput;
};

const convertCombinedFiltersDates = filters => {
    const formattedFilters = [].concat(filters);

    filters.forEach(filter => {
        if (Object.keys(DATES_STRUCTURE).includes(filter.field_name)) {
            const { key: dateStructureKey, value: dateStructureValue } = DATES_STRUCTURE[filter.field_name];

            const connectedFilter = formattedFilters.find(filter => filter.field_name === dateStructureKey);

            if (connectedFilter && connectedFilter.rule === filter.rule) {
                connectedFilter.value[dateStructureValue] = filter.value;
            } else {
                const groupedDateFilterItem = {
                    field_name: dateStructureKey,
                    rule: filter.rule,
                    value: {
                        [dateStructureValue]: filter.value,
                    },
                };

                formattedFilters.push(groupedDateFilterItem);
            }
        }
    });

    return formattedFilters.filter(filter => !Object.keys(DATES_STRUCTURE).includes(filter.field_name));
};

const checkIsFilterSimple = input => {
    const inputKeys = Object.keys(input);

    if (inputKeys.includes(ADVANCED_FILTERS)) return false;

    return Object.keys(input).some(el => ALLOWED_FILTER_FIELDS.includes(el));
};

const convertFilterSimpleToAdvanced = input => {
    const preparedInput = convertSimpleDatesToAdvancedStructure(input);

    return Object.keys(preparedInput).reduce((acc, key) => {
        if (!ALLOWED_FILTER_FIELDS.includes(key)) {
            return acc;
        }

        if (!preparedInput[key]) return acc;

        let rule = FILTER_SIMPLE_RULE;

        if (FILTER_DATES_FROM.includes(key)) {
            rule = FILTER_SIMPLE_DATE_FROM;
        }

        if (FILTER_DATES_TO.includes(key)) {
            rule = FILTER_SIMPLE_DATE_TO;
        }

        if (FILTER_JSON.includes(key)) {
            rule = FILTER_SIMPLE_JSON;
        }

        if (FILTER_STRING.includes(key)) {
            rule = FILTER_SIMPLE_STRING;
        }

        acc.push({
            field_name: key,
            rule,
            value: preparedInput[key],
        });

        return acc;
    }, []);
};

const convertFiltersToSequelize = filters => {
    return filters.reduce((allFilters, filter) => {
        const {
            rule,
            field_name: fieldName,
            value,
        } = filter;

        allFilters[fieldName] = { rule, value };

        return allFilters;
    }, {});
};

const convertInputFilters = input => {
    const isSimpleFilters = checkIsFilterSimple(input);

    const { filters: inputFilters } = input;
    const { value, relation } = JSON.parse(inputFilters || '{}');
    const parsedInputValue = JSON.parse(value || '[]');

    const formattedFilterValue = isSimpleFilters
        ? convertFilterSimpleToAdvanced(input)
        : convertCombinedFiltersDates(parsedInputValue);

    const filters = convertFiltersToSequelize(formattedFilterValue);

    return {
        relation: relation || 'AND',
        filters,
    };
};

const getUnduplicatedName = name => {
    return name.split(FILTER_DUPLICATE_REGEX)[0];
};

const getDuplicateNumber = name => {
    const regex = new RegExp(FILTER_DUPLICATE_NUMBER_REGEX);

    return +((regex.exec(name) || {}).groups || {}).number || 0;
};

const validateFilterValue = value => {
    return !value.some(el => !(el.field_name || '').trim()
        || !el.rule
        || (!el.value || !forceArray(el.value).length)
    );
};

const cutValuesForDesciption = selectedValues => {
    if (selectedValues.length > 1) {
        const cuttedValues = selectedValues.splice(1);

        return selectedValues.join().concat(` and ${cuttedValues.length} more`);
    }

    return selectedValues.join();
};

const formatDataToDescription = data => {
    const selectedValues = data.map(el => {
        if ('city' in el || 'country' in el) {
            return el.name || el.address_1 || el.address_3 || el.city || el.country;
        }

        if ('description' in el) {
            return el.description;
        }

        return el.name;
    });

    return cutValuesForDesciption(selectedValues);
};

const checkIsAllowedToChange = (filter, user) => {
    const {
        user_id: userId,
        account_id: accountId,
        is_public: isPublic,
    } = filter;

    const {
        account,
        mainAccount,
        roles,
    } = user;

    const isSelfAdmin = roles.includes('self_admin');

    const canManageIfPublic = isPublic && accountId === (mainAccount || account).id && isSelfAdmin;

    return (userId === user.id) || canManageIfPublic;
};

const buildShRequestHasModesCondition = filterMode => {
    const modes = Array.isArray(filterMode.value) ? filterMode.value : (filterMode.value || '').split(',');

    const filtersByModes = modes.map(mode => {
        const key = `has_mode_${mode}`.replace('-', '_');

        return { [key]: filterMode.rule === 'is' };
    });

    const modesRelation = filterMode.rule === 'is' ? '$or' : '$and';

    return { [modesRelation]: filtersByModes };
};

const buildAddressFilters = query => {
    const filters = {};

    const keys = [
        'departureCountries',
        'departureLogzones',
        'departureZipcodes',
        'arrivalCountries',
        'arrivalLogzones',
        'arrivalZipcodes',
    ];

    keys.forEach(key => {
        if (query[key]) {
            filters[key] = { rule: 'is', value: query[key] };
        }
    });

    return filters;
};

module.exports = {
    convertFilterSimpleToAdvanced,
    convertFiltersToSequelize,
    checkIsFilterSimple,
    convertInputFilters,
    getUnduplicatedName,
    getDuplicateNumber,
    validateFilterValue,
    formatDataToDescription,
    checkIsAllowedToChange,
    buildShRequestHasModesCondition,
    buildAddressFilters,

    FILTER_DUPLICATE_POSTFIX,
    FILTER_DUPLICATE_REGEX,
    FILTER_DUPLICATE_NUMBER_REGEX,
    FILTER_KEYS_TO_ENTITIES,
    FILTER_SORT_KEY,
    ENTITY_ACCOUNTING,
    ENTITY_ADDRESS,
    ENTITY_LOCATION_ZONE,
    ENTITY_LOCATION_ZONE_DOCK_DOOR,
    ENTITY_CARRIER,
    ENTITY_SHIPPER,
    ENTITY_TAG,
    ENTITY_USER,
    NO_STATUS,

    FILTER_VALUE_NONE,
};
