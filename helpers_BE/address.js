const i18nIsoCountries = require('i18n-iso-countries');
const postalCodes = require('postal-codes-js');

const SPECIFIC_VALIDATION = [
    {
        code: 'FR',
        rule: /^[0-9]{1}[A-Z]{1}[0-9]{3}$/,
    },
    {
        code: 'XK',
        rule: /^\d{5}$/,
    },
    {
        code: 'VN',
        rule: /^\d{5}$/,
    },
    {
        code: 'KR',
        rule: /^\d{3}-\d{3}$/,
    },
    {
        code: 'GB',
        rule: /^[a-zA-z]{1}[a-hA-Hj-yJ-Y]{0,1}\d{1,2}$/,
    },
];
// Supported languages in i18n-iso-countries library
// sorted by priority of the language
const supportedLanguages = [
    'en',
    'fr',
    'de',
    'es',
    'pt',
    'pl',
    'lt',
    'ru',
    'it',
    'ro',
    'sk',
    'cs',
    // 'ar',
    // 'az',
    // 'be',
    // 'bg',
    // 'bn',
    // 'bs',
    // 'ca',
    // 'cs',
    // 'da',
    // 'et',
    // 'fa',
    // 'fi',
    // 'gl',
    // 'el',
    // 'he',
    // 'hi',
    // 'hr',
    // 'hu',
    // 'hy',
    // 'id',
    // 'ja',
    // 'ka',
    // 'kk',
    // 'ko',
    // 'ky',
    // 'lv',
    // 'mk',
    // 'mn',
    // 'ms',
    // 'nb',
    // 'nl',
    // 'nn',
    // 'sl',
    // 'sr',
    // 'sv',
    // 'th',
    // 'tr',
    // 'uk',
    // 'ur',
    // 'uz',
    // 'zh',
    // 'vi',
];

const availableCountryNames = {
    'united states': 'United States of America',
    england: 'Great Britain',
};

const availableEmptyZipcodes = [
    'AO', 'AG', 'AW', 'BS', 'BZ', 'BJ', 'BM', 'BO', 'BQ', 'BW',
    'BF', 'BI', 'CM', 'CF', 'TD', 'KM', 'CG', 'CD', 'CK', 'CI',
    'CW', 'DJ', 'DM', 'TL', 'GQ', 'ER', 'FJ', 'TF', 'GA', 'GM',
    'GD', 'GY', 'HM', 'HK', 'KI', 'KP', 'LY', 'MO', 'ML', 'MR',
    'NR', 'NL', 'NU', 'QA', 'RW', 'ST', 'SC', 'SL', 'SX', 'SB',
    'SS', 'SR', 'SY', 'TG', 'TK', 'TO', 'TV', 'UG', 'AE', 'VU',
    'YE', 'ZW', 'EG', 'LB', 'XK', 'PE', 'GT', 'MM', 'ET',
    'HN', 'SV', 'KE', 'CL', 'SA', 'MU', 'DO', 'GH', 'AL',
];

const locationValidatedFields = ['city', 'lat', 'lng', 'url', 'place_id'];

const DEFAULT_SITE_STATUS_SETTINGS = [
    {
        type: 'loaded',
        direction: 'from',
        color: '#377d4f',
        group: 'closed',
    },
    {
        type: 'loaded',
        direction: 'dest',
        color: '#59c57d',
        group: 'closed',
    },
    {
        type: 'canceled',
        color: '#ad3e55',
        group: 'anomaly',
    },
    {
        type: 'refused',
        color: '#f2ae53',
        group: 'anomaly',
    },
    {
        type: 'no_show',
        color: '#333333',
        group: 'anomaly',
    },
];

const getLogisticZone = (countryCode, zipcode) => {
    if (countryCode && zipcode) {
        return `${countryCode}${zipcode.slice(0, 2)}`;
    }

    return '';
};

const validateCountryCode = code => {
    return i18nIsoCountries.isValid(code);
};

const getAlpha2Code = country => {
    if ((country || '').length === 2 && validateCountryCode(country)) {
        return country.toUpperCase();
    }

    const countryToFind = availableCountryNames[`${(country || '').toLowerCase()}`] || country;
    for (const lang of supportedLanguages) {
        const code = i18nIsoCountries.getAlpha2Code(countryToFind, lang);

        if (code) {
            return code;
        }
    }

    return null;
};

const getAlpha3Code = country => {
    const countryToFind = availableCountryNames[`${(country || '').toLowerCase()}`] || country;

    for (const lang of supportedLanguages) {
        const code = i18nIsoCountries.getAlpha3Code(countryToFind, lang);

        if (code) {
            return code;
        }
    }

    return null;
};

const getIso2Iso3ForCountry = country => {
    return {
        iso2: getAlpha2Code(country),
        iso3: getAlpha3Code(country),
    };
};

const checkSpecificValidation = (countryCode, zipCode) => {
    const validation = SPECIFIC_VALIDATION.find(el => el.code === (countryCode || '').toUpperCase());

    if (!validation) return false;

    return validation.rule.test(zipCode);
};

const validateZipcode = (zipcode, countryCode) => {
    if (!zipcode && availableEmptyZipcodes.includes((countryCode || '').toUpperCase())) {
        return true;
    }

    const formattedZipCode = zipcode || ' ';

    const res = postalCodes.validate(countryCode, formattedZipCode);

    if (typeof res === 'string' && !checkSpecificValidation(countryCode, formattedZipCode)) {
        return false;
    }

    return true;
};

const needToValidateLocation = (newLocation, oldLocation) => {
    return locationValidatedFields.some(field => newLocation[field] && newLocation[field] !== oldLocation[field]);
};

const validateLocationData = (newLocation, googleLocation) => {
    const newLocationData = Object.assign({}, {
        city: newLocation.city,
        lat: newLocation.lat,
        lng: newLocation.lng,
        url: newLocation.url,
        place_id: newLocation.place_id,
    });

    const googleLocationData = Object.assign({}, {
        city: googleLocation.name,
        lat: String(googleLocation.geometry.location.lat),
        lng: String(googleLocation.geometry.location.lng),
        url: googleLocation.url,
        place_id: googleLocation.place_id,
    });

    return !locationValidatedFields
        .some(field => googleLocationData[field] && newLocationData[field] !== googleLocationData[field]);
};

const getCountryFromAlpha2Code = code => {
    return i18nIsoCountries.getName(code, 'en');
};

const ADDRESS_FROM = 'from';
const ADDRESS_DEST = 'dest';

const TRACKING_POINTS_DIRECTIONS = {
    departure: ADDRESS_FROM,
    arrival: ADDRESS_DEST,
};

const SHIPMENT_ADDRESS_ATTRIBUTES = [
    'id',
    'name',
    'country',
    'city',
    'zipcode',
    'country_code_alpha2',
    'address_1',
    'address_2',
    'address_3',
    'logistic_zone',
    'is_location',
    'is_master',
    'dest_zone_id',
    'from_zone_id',
    'is_tailgate',
    'is_slot_booking',
    'slot_booking_email',
    'slot_booking_phone_number',
    'slot_booking_fax_number',
    'slot_booking_url',
    'type',
    'url',
    'lat',
    'lng',
    'email',
    'phone_number',
    'locode',
    'shipper_id',
    'timezone',
    'message',
];

const phoneFormatted = (str = '') => {
    const phone = str.trim();
    const plus = phone.indexOf('+') === 0 ? '+' : '';

    return `${plus}${phone.replace(/[^0-9]/g, '')}`;
};

const buildAddressWithContactData = (address, direction, additionalInfo) => {
    const info = (additionalInfo || []).find(item =>
        item.address_id === address.id
        && item.direction === direction
    );

    if (!info) {
        return address;
    }

    address.contact_first_name = address.contact_first_name || info.first_name;
    address.contact_last_name = address.contact_last_name || info.last_name;
    address.phone_number = phoneFormatted(address.phone_number || info.phone);

    return address;
};

module.exports = {
    getAlpha2Code,
    getAlpha3Code,
    getIso2Iso3ForCountry,
    getLogisticZone,
    validateZipcode,
    validateCountryCode,
    getCountryFromAlpha2Code,
    buildAddressWithContactData,
    needToValidateLocation,
    validateLocationData,

    ADDRESS_FROM,
    ADDRESS_DEST,
    TRACKING_POINTS_DIRECTIONS,

    SHIPMENT_ADDRESS_ATTRIBUTES,
    DEFAULT_SITE_STATUS_SETTINGS,
};
