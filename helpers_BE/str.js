const diacritics = require('diacritics');

const FULL_NAMES = {
    STREET: 'street',
    AVENUE: 'avenue',
    BOULEVARD: 'boulevard',
    ROAD: 'road',
    DRIVE: 'drive',
    LANE: 'lane',
    COURT: 'court',
    CIRCLE: 'circle',
    PLACE: 'place',
    SQUARE: 'square',
    TERRACE: 'terrace',
    HIGHWAY: 'highway',
    BUILDING: 'building',
    APARTMENT: 'apartment',
    SUITE: 'suite',
    FLOOR: 'floor',
    ROOM: 'room',
    NUMBER: 'number',
    TELEPHONE: 'telephone',
    FAX: 'fax',
    MOBILE: 'mobile',
    EXTENSION: 'extension',
};

const ABBREVIATIONS = {
    STREET: 'st.',
    AVENUE: 'ave.',
    BOULEVARD: 'blvd.',
    ROAD: 'rd.',
    DRIVE: 'dr.',
    LANE: 'ln.',
    COURT: 'ct.',
    CIRCLE: 'cir.',
    PLACE: 'pl.',
    SQUARE: 'sq.',
    TERRACE: 'ter.',
    HIGHWAY: 'hwy.',
    BUILDING: 'bldg.',
    APARTMENT: 'apt.',
    SUITE: 'ste.',
    FLOOR: 'fl.',
    ROOM: 'rm.',
    NUMBER: 'no.',
    TELEPHONE: 'tel.',
    FAX: 'fax',
    MOBILE: 'mob.',
    EXTENSION: 'ext.',
};

const ADDRESS_ABBREVIATIONS = {
    [FULL_NAMES.STREET]: ABBREVIATIONS.STREET,
    [FULL_NAMES.AVENUE]: ABBREVIATIONS.AVENUE,
    [FULL_NAMES.BOULEVARD]: ABBREVIATIONS.BOULEVARD,
    [FULL_NAMES.ROAD]: ABBREVIATIONS.ROAD,
    [FULL_NAMES.DRIVE]: ABBREVIATIONS.DRIVE,
    [FULL_NAMES.LANE]: ABBREVIATIONS.LANE,
    [FULL_NAMES.COURT]: ABBREVIATIONS.COURT,
    [FULL_NAMES.CIRCLE]: ABBREVIATIONS.CIRCLE,
    [FULL_NAMES.PLACE]: ABBREVIATIONS.PLACE,
    [FULL_NAMES.SQUARE]: ABBREVIATIONS.SQUARE,
    [FULL_NAMES.TERRACE]: ABBREVIATIONS.TERRACE,
    [FULL_NAMES.HIGHWAY]: ABBREVIATIONS.HIGHWAY,
    [FULL_NAMES.BUILDING]: ABBREVIATIONS.BUILDING,
    [FULL_NAMES.APARTMENT]: ABBREVIATIONS.APARTMENT,
    [FULL_NAMES.SUITE]: ABBREVIATIONS.SUITE,
    [FULL_NAMES.FLOOR]: ABBREVIATIONS.FLOOR,
    [FULL_NAMES.ROOM]: ABBREVIATIONS.ROOM,
    [FULL_NAMES.NUMBER]: ABBREVIATIONS.NUMBER,
    [FULL_NAMES.TELEPHONE]: ABBREVIATIONS.TELEPHONE,
    [FULL_NAMES.FAX]: ABBREVIATIONS.FAX,
    [FULL_NAMES.MOBILE]: ABBREVIATIONS.MOBILE,
    [FULL_NAMES.EXTENSION]: ABBREVIATIONS.EXTENSION,
};

const dashedToCap = s => s.replace(/_/g, ' ').replace(/\b[a-z]/g, f => f.toUpperCase());

const getAbbreviation = s => ADDRESS_ABBREVIATIONS[String(s).toLowerCase()] || null;

// TODO: handle `street.` case etc
const replaceWithAbbreviations = s => String(s).split(' ').map(w => getAbbreviation(w) || w).join(' ');

const makePlural = s => {
    const last = s.slice(-1);
    if (last === 'y') {
        return `${s.slice(0, s.length - 1)}ies`;
    } else if (last === 'x') {
        return `${s}es`;
    }
    return `${s}s`;
};

const pluralize = (x, s) => {
    return x === 1 ? s : makePlural(s);
};

const getWordSuffixes = word => {
    if (!word) {
        return [];
    }

    const suffixes = [];

    for (let i = 0; i < word.length; i += 1) {
        suffixes.push(word.substr(i));
    }

    return suffixes.join(' ');
};

const getSuffixes = text => (text || '').toString()
    .split(' ')
    .filter(record => !!record)
    .reduce((all, record) => all.concat(getWordSuffixes(record)), [])
    .join(' ');

const buildReplacerWithTags = (preTag, postTag) => (text, query) => {
    if (!text) {
        return null;
    }
    return text.toString()
        .replace(new RegExp(query, 'gi'), `${preTag}$&${postTag}`);
};

const ucOnlyFirst = s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

const ucFirst = s => s.charAt(0).toUpperCase() + s.slice(1);

const cleanUpWhitespace = s => String(s).replace(/\s+/g, ' ').trim();

const getDomainFromEmail = email => email.split('@')[1];

const getCompanyFromEmail = (email, skipDomains = []) => {
    const domain = getDomainFromEmail(email);

    if (skipDomains.includes(domain)) {
        return '';
    }

    return email.replace(/.*@(.*)\..*$/, '$1');
};

const camelCaseToWords = (str, delimiter = ' ') => {
    return (str || '').split(/(?=[A-Z])/).join(delimiter);
};

const kebabCaseToWords = (str, delimiter = ' ') => {
    return (str || '').split('-').join(delimiter);
};

const sanitizeMarkdown = str => {
    return (str || '').replace(/(\*|_)/g, '\\$1');
};

const replaceSpecialCharsBySpace = string => string.replace(/[&/\\#,+()$~%.'":*?<>{}]/g, ' ');

const removeDiacritics = diacritics.remove;

/**
 * @param {string} string
 * @param {number} length
 * @returns {string}
 */
const getFormattedStringByLength = (string, length) => {
    const formattedString = (string || '').replace(/(\r\n|\n|\r)/gm, ' ');

    return formattedString.substring(0, length);
};

const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@ "]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const isEmailValid = email => {
    return EMAIL_PATTERN.test(email);
};

const namesFromEmail = email => ((email.split('@') || [])[0] || '').split('.');

const nonProfessionalDomains = [
    'gmail.com',
    'hotmail.com',
    'yahoo.fr',
    'free.fr',
    'hotmail.fr',
    'yahoo.com',
    'orange.fr',
    'wanadoo.fr',
    'libero.it',
    'me.com',
    'laposte.net',
    'yahoo.it',
    'neuf.fr',
    'outlook.com',
    'aol.com',
    'sfr.fr',
    'icloud.com',
    'mac.com',
    'msn.com',
    'hotmail.it',
    'alice.it',
    'tiscali.it',
    'tin.it',
    'outlook.fr',
    'live.fr',
    'laposte.fr',
    'googlemail.com',
    'gadz.org',
    'club-internet.fr',
    'bluewin.ch',
    'bbox.fr',
    'live.com',
    'hotmail.co.uk',
    'm4x.org',
    'gmx.net',
    'centraliens.net',
    'ymail.com',
    'yahoo.es',
    'yahoo.co.uk',
    'mines-paris.org',
    'kedgebs.com',
    'cegetel.net',
    'web.de',
    'tremplin-utc.net',
    'student.42.fr',
    'edhec.com',
    'essec.edu',
    'numericable.fr',
    'aliceadsl.fr',
    'bem.edu',
    'dbmail.com',
    'virgilio.it',
    'gmx.fr',
    'voila.fr',
    'yahoo.com.br',
    'gmx.de',
    'essca.eu',
    '9online.fr',
    'rocketmail.com',
    'hec.edu',
    'yopmail.com',
    'alis-intl.com',
];

const isNotProfessionalDomain = domain => {
    return !nonProfessionalDomains.includes(domain);
};

const getGroupingManifestId = groupId => {
    return groupId.toString().padStart(9, '0');
};

const formatBoolean = value => {
    if (typeof value === 'boolean') {
        return value;
    }

    const isBoolean = ['true', 'false'].includes(value);

    if (isBoolean) {
        return value === 'true';
    }

    return false;
};

const HTTP_URL_PATTERN = /https?:\/\/[^\s]{2,}\.[^\s]{2,}/;
const RE_NON_ASCII_CHAR = /[^\x00-\x7F]/g;

/**
 * Removes non-ascii characters like "©", "😃" et cetera from `string`.
 *
 * @category String
 * @param {string} [string=''] The string to remove non-ASCII.
 * @returns {string} Returns the cleaned string.
 * @example
 *
 * replaceNonASCII('exa😃mple.com©')
 * // => 'example.com'
 */
function replaceNonASCII(string, replacement = '') {
    return string ? string.replace(RE_NON_ASCII_CHAR, replacement) : '';
}

const NUMBER_PATTERN = /^-?\d+\.?\d*$/;
const isString = val => typeof val === 'string';

const buildMaskedData = (data, hiddenCount) => {
    if (!data) return null;

    const dataAsString = data.toString();
    const length = dataAsString.length;

    if (hiddenCount >= length) {
        return '*'.repeat(length);
    }

    return dataAsString.slice(0, length - hiddenCount).concat('*'.repeat(hiddenCount));
};

const wrapToSearchByLike = str => `%${str}`;

const numberWithChunks = (input, chunkSize = 3, totalLength = null) => {
    let paddedInput = input;

    if (totalLength !== null) {
        paddedInput = paddedInput.padStart(totalLength, '0').slice(-totalLength);
    }

    const regex = new RegExp(`.{1,${chunkSize}}`, 'g');
    const chunks = paddedInput.split('').reverse().join('').match(regex);

    const formattedString = chunks.map(chunk => chunk.split('').reverse().join('')).reverse().join(' ');

    return formattedString;
};

/**
 * Shortens words in a string based on given options.
 *
 * @description
 * This function shortens words in the input string that exceed the specified maximum word length
 * by replacing the excess characters with a specified replacer. It processes each word and checks
 * if the resulting string's length is within the maximum length. The function may return a string
 * exceeding the maximum length if all words have been shortened but the string is still too long.
 *
 * @param {string} inputString
 * @param {object} options - The options for processing the string.
 * @param {number} options.maxLength - The maximum allowed length of the resulting string.
 * @param {number} [options.maxWordLength] - The maximum allowed length for each word. 5 by default
 * @param {string} [options.replacer] - The string to use as a replacement when shortening words. "**" by default
 * @param {boolean} [options.ignoreNumbers] - If true, numbers are not shortened.
 * Used `true` for first pass, then if maxLength is still exceeded, used `false` for second pass
 *
 * @returns {string} The processed string with shortened words.
 *
 * @example
 * shortenWords('implementation requires', { maxLength: 15 })
 * // => 'imp** requires'
 *
 * @example
 * shortenWords('implementation requires', { maxLength: 10 })
 * // => 'imp** req**'
 */
function shortenWords(inputString, options) {
    const {
        maxLength,
        maxWordLength = 5,
        replacer = '**',
        ignoreNumbers = true,
    } = options || {};

    if (typeof inputString !== 'string') {
        throw new Error('invalid input');
    }

    if (!(maxLength && maxWordLength && replacer)) {
        throw new Error('invalid options');
    }

    const cleanWordLength = maxWordLength - replacer.length;
    const words = inputString.split(' ');

    for (let i = 0; i < words.length; i++) {
        if (words.join(' ').length <= maxLength) break;

        const originalWord = words[i];
        const originalWordLength = originalWord.length;

        const isWordSmaller = maxWordLength >= originalWordLength;
        const isNumber = /^[\d]+$/.test(originalWord);
        const isSkipNumber = ignoreNumbers && isNumber;

        const shortenedWord = isSkipNumber || isWordSmaller
            ? originalWord
            : originalWord.slice(0, cleanWordLength) + replacer;

        if (originalWord !== shortenedWord) {
            words[i] = shortenedWord;
        }
    }

    const result = words.join(' ');

    if (result.length <= maxLength) return result;

    if (ignoreNumbers === true) {
        return shortenWords(inputString, {
            ...options,
            ignoreNumbers: false,
        });
    }

    return result;
}

module.exports = {
    formatBoolean,
    shortenWords,
    dashedToCap,
    pluralize,
    getSuffixes,
    buildReplacerWithTags,
    ucOnlyFirst,
    ucFirst,
    getCompanyFromEmail,
    camelCaseToWords,
    kebabCaseToWords,
    getDomainFromEmail,
    sanitizeMarkdown,
    replaceSpecialCharsBySpace,
    removeDiacritics,
    getFormattedStringByLength,
    isNotProfessionalDomain,
    isEmailValid,
    getGroupingManifestId,
    replaceNonASCII,
    namesFromEmail,
    isString,
    buildMaskedData,
    wrapToSearchByLike,

    numberWithChunks,
    cleanUpWhitespace,
    replaceWithAbbreviations,

    EMAIL_PATTERN,
    HTTP_URL_PATTERN,
    RE_NON_ASCII_CHAR,
    NUMBER_PATTERN,
};
