/**
 *
 * @param obj
 * @returns {boolean}
 */
const isEmpty = obj => {
    for (const key in obj) {
        if (typeof obj[key] === 'object' && !isEmpty(obj[key])) {
            return false;
        }
        if (typeof obj[key] !== 'object' && obj[key]) {
            return false;
        }
    }
    return true;
};
/**
 *
 * @param any
 * @returns {boolean}
 */
const isIsset = value => {
    if (typeof value === 'undefined') {
        return false;
    }
    return true;
};

const isEquals = (a, b, fields) => {
    if (!a || !b) {
        return false;
    }

    for (let i = 0; i < fields.length; i += 1) {
        const field = fields[i];

        if ((!!a[field] || !!b[field]) && a[field] !== b[field]) {
            return false;
        }
    }

    return true;
};

/**
 * Return object with only selected properties picked.
 * @template {Partial<Record<any, any>>} T
 * @template {keyof T} K
 * @param {T} obj
 * @param {Array<K>} keys
 * @returns {Pick<T, K> }
 */
const pick = (obj, keys) => Object.keys(obj || {})
    .filter(key => keys.includes(key))
    .reduce((accum, key) => Object.assign({}, accum, { [key]: obj[key] }), {});

/**
 * Return object with only selected properties picked.
 * Keys that are not in objects will not be added to result even as undefined.
 * @template {Partial<Record<string, unknown>>} T
 * @param {T} obj
 * @param {Array<keyof T>} keys
 * @returns {Pick<obj, keys>}
 */
const pickExisting = (obj, keys) => Object.keys(obj)
    .filter(key => keys.includes(key))
    .reduce((accum, key) => {
        if (typeof obj[key] === 'undefined') return accum;

        return Object.assign({}, accum, { [key]: obj[key] });
    }, {});

/**
 * @template {Partial<Record<string, unknown>>} T
 * @template {keyof T} K
 * @param {Array<T>} array
 * @param {K} field
 * @returns {Record<T[K], Array<T>>}
 */
const groupByField = (array, field) => {
    return array
        .reduce((acc, item) => {
            const key = item[field];

            acc[key] = acc[key] || [];
            acc[key].push(item);

            return acc;
        }, /** @type {Record<T[K], Array<T>>} */ ({}));
};

const flattenObj = (obj, parent, res = {}) => {
    Object.keys(obj).forEach(key => {
        const propName = parent ? `${parent}.${key}` : key;
        if (typeof obj[key] === 'object') {
            flattenObj(obj[key], propName, res);
        } else {
            res[propName] = obj[key];
        }
    });

    return res;
};

/**
 * @template {string} K
 * @template {Record<K|string, any>} I
 * @param {Array<I>} array
 * @param {K} field
 * @returns {Record<I[K], I>}
 */
const transposeArrayToObjectByUniqueKey = (array, field) => {
    return (array || [])
        .reduce((acc, item) => {
            const key = item[field];
            acc[key] = item;
            return acc;
        }, {});
};

const parseToJSON = obj => {
    try {
        return obj.toJSON();
    } catch (error) {
        return obj;
    }
};

const isObjectsEqual = (a, b) => {
    if (a === b) return true;

    if (Object.keys(a).length !== Object.keys(b).length) return false;

    // eslint-disable-next-line security/detect-object-injection
    return Object.keys(a).every(key => a[key] === b[key]);
};

/**
 * Return object copy with properties omitted
 * @template {object} T
 * @template {(keyof T)[]} K
 * @param {T} o original object
 * @param {K} omitKeys list of properties to omit
 * @returns {{ [K2 in Exclude<keyof T, K[number]>]: T[K2] }}
 */
const omit = (o, omitKeys) => {
    const pickKeys = Object.keys(o).filter(
        objKey => !omitKeys.includes(objKey)
    );

    return pick(o, pickKeys);
};

/**
 * Check if value null or undefined
 * @param {any} val
 * @returns
 */
const isNullish = val => [null, undefined].includes(val);

/**
 * Check if value is object
 * @param {any} val
 * @returns {boolean}
 */
const isObject = val => typeof val === 'object' && val !== null;

/**
 * Return copy of object without `null` or `undefined` properties
 * @template {Record<string, any>} T
 * @param {T} o
 * @returns {{[P in keyof T]: Exclude<T[P], null|undefined>;}}
 */
const omitEmptyProperties = o => {
    return Object.entries(o)
        .filter(([, val]) => !isNullish(val))
        .reduce(
            (acc, [key, val]) => Object.assign({}, acc, { [key]: val }),
            {}
        );
};

/**
 * Checks if a specified key exists in an object
 *
 * @param {Object} obj - The object to check within
 * @param {string} key - The key to check for
 *
 * @returns {boolean} Returns true if the key exists in the object, otherwise false
 * @throws {Error} Throws an error if the first parameter is not an object
 */
const hasKey = (obj, key) => {
    if (!isObject(obj)) throw new Error('Invalid input');
    return String(key) in obj;
}

/**
 * Return copy of object with properties modified by callback.
 * By default, all properties modified, but it's possible to specify list of property names.
 * @param {object} obj object
 * @param {Function} cb callback applyed to properties
 * @param {string[]?} fields listof property names to modify
 * @returns
 */
const modifyProperties = (obj, cb, fields) => {
    if (typeof cb !== 'function') throw Error('callback is required');
    const _fields = fields || Object.keys(obj);

    return Object.entries(obj).reduce(
        (acc, [key, val]) =>
            Object.assign({}, acc, {
                [key]: _fields.includes(key) ? cb(val) : val,
            }),
        {}
    );
};

/**
 * Check if 1st object contains all properties from 2nd object
 * @param {object} mainObj
 * @param {object} subObj
 */
const isShallowEqual = (mainObj, subObj) => {
    return isObjectsEqual(pick(mainObj, Object.keys(subObj)), subObj);
};

/**
 * Try to parse string to JSON, on error return `{}` or `data`
 * @param {string|any} data
 * @param {boolean} isInitialData
 * @returns {Record<string,any>|{}}
 */
const parseJSON = (data, isInitialData) => {
    try {
        return JSON.parse(data);
    } catch (err) {
        if (isInitialData) return data;

        return {};
    }
};

/**
 * Sort object keys by array of sorted keys
 * @param {string[]} sortedKeys
 * @param {object} object
 * @returns {Record<string,any>|{}}
 */
const sortObjectKeys = (sortedKeys, object) => {
    return sortedKeys.reduce((acc, key) => {
        acc[key] = object[key];
        return acc;
    }, {});
};

/**
 * @template {object} T
 * @param {Array<T>} objects
 * @param {Array<keyof T>} [fieldsToCheckEqual] keys to compare. All by default
 * @param {boolean} [toPrimitive] - If set, Date fields will be converted to string. Default true
 * @return {Boolean}
 */
const checkFieldEqualityOfMultipleObject = (objects, fieldsToCheckEqual, toPrimitive = true) => {
    const keys = fieldsToCheckEqual || objects.map(/** @returns {Array<keyof T>} */ o => Object.keys(o)).flat();

    const convertToPrimitive = val => {
        if (!toPrimitive) return val;
        if (val instanceof Date) {
            return val.toISOString();
        }

        return val;
    };

    return objects.every(obj1 => objects.every(obj2 => keys.every(field => {
        const val1 = obj1[field];
        const val2 = obj2[field];
        const isSameType = typeof val1 === typeof val2;
        const isEqual = convertToPrimitive(val1) === convertToPrimitive(val2);

        return isSameType && isEqual;
    })));
};

const cleanUndefined = object => {
    const validEntries = Object.entries(object).filter(el => typeof el[1] !== 'undefined');
    return Object.fromEntries(validEntries);
};

const cleanNullable = object => {
    const validEntries = Object.entries(object).filter(el => el[1] !== null);

    return Object.fromEntries(validEntries);
};

const getIsIsset = (value, defaultValue = null) => {
    return isIsset(value) ? value : defaultValue;
};

const getNestedProperty = (obj, path) => {
    const keys = path.split('.');
    let current = obj;

    for (const key of keys) {
        // eslint-disable-next-line no-prototype-builtins
        if (current && current.hasOwnProperty(key)) {
            current = current[key];
        } else {
            return undefined;
        }
    }

    return current;
};
const getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value);
};

const isCleanedObjectEmpty = object => {
    const cleanedData = cleanUndefined(object);

    return isEmpty(cleanedData);
};

module.exports = {
    /**
     * Mass assignment
     * Example:
     * a({}, obj, ['prop', 'prop2'])
     * @param to
     * @param from
     * @param props
     */
    a(to, from, props) {
        const newTo = Object.assign({}, to);
        for (const i of props) {
            if (from[i] !== undefined) newTo[i] = from[i];
        }
        return newTo;
    },
    pickExisting,
    isEmpty,
    isEquals,
    pick,
    omit,
    groupByField,
    isIsset,
    flattenObj,
    parseToJSON,
    transposeArrayToObjectByUniqueKey,
    isObjectsEqual,
    omitEmptyProperties,
    modifyProperties,
    isShallowEqual,
    isNullish,
    parseJSON,
    sortObjectKeys,
    checkFieldEqualityOfMultipleObject,
    cleanUndefined,
    getIsIsset,
    getNestedProperty,
    getKeyByValue,
    cleanNullable,
    isCleanedObjectEmpty,
    isObject,
    hasKey,
};
