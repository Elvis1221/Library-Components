/**
 * @template T
 * @param {Array<T | T[]>} arr
 * @returns {Array<T>}
 */
// eslint-disable-next-line prefer-spread
const flatten = arr => [].concat.apply([], arr);

const range = n => [...Array(n).keys()];

const forceArray = x => { return Array.isArray(x) ? x : [x]; };

const arrayDiff = (a, b) => a.filter(i => !b.includes(i));

const arraySimilar = (a, b) => a.filter(i => b.includes(i));

const isEmptyArray = x => !forceArray(x).filter(Boolean).length;

const isArray = x => Array.isArray(x);

const getUnique = arr => {
    const u = {};
    const a = [];
    const l = arr.length;
    for (let i = 0; i < l; i += 1) {
        // eslint-disable-next-line no-prototype-builtins
        if (!u.hasOwnProperty(arr[i])) {
            a.push(arr[i]);
            u[arr[i]] = 1;
        }
    }
    return a;
};

const getUniqueArray = arr => Array.from(new Set(arr));

const getUniqueByKey = (objectsArr, key) => {
    const u = {};
    return objectsArr.reduce((acc, value) => {
        const keyValue = value[key];
        if (!u[keyValue]) {
            acc.push(value);
            u[keyValue] = 1;
        }
        return acc;
    }, []);
};

const sortObjectsByKey = (field, asc = false) => (a, b) => {
    const x = (asc && b) || a;
    const y = (asc && a) || b;

    if (x[field] < y[field]) {
        return 1;
    }
    if (x[field] > y[field]) {
        return -1;
    }
    return 0;
};

const sortObjectsByTwoKey = (field1, field2, descent1 = false, descent2 = false) => (x, y) => {
    const x1 = typeof x[field1] === 'string' ? x[field1].toLowerCase() : (x[field1] || null);
    const y1 = typeof y[field1] === 'string' ? y[field1].toLowerCase() : (y[field1] || null);
    const x2 = typeof x[field2] === 'string' ? x[field2].toLowerCase() : (x[field2] || null);
    const y2 = typeof y[field2] === 'string' ? y[field2].toLowerCase() : (y[field2] || null);

    if (descent1) {
        if (x1 < y1) return 1;
        if (x1 > y1) return -1;
    } else {
        if (x1 < y1) return -1;
        if (x1 > y1) return 1;
    }

    if (descent2) {
        if (x2 < y2) return 1;
        if (x2 > y2) return -1;
    } else {
        if (x2 < y2) return -1;
        if (x2 > y2) return 1;
    }

    return 0;
};

const hasItem = (array, object) => {
    const keys = Object.keys(object);

    const result = array
        .map(el => {
            const matched = keys.filter(key => el[key] === object[key]);

            return matched.length;
        })
        .every(el => el === keys.length);

    return result;
};

const deepCopyArrayOfObjects = array => {
    return array.map(el => Object.assign({}, el));
};

const getMaxArrayItem = arr => {
    if (!(arr || []).length) {
        return null;
    }

    return arr.reduce((a, b) => { return a > b ? a : b; });
};

const getMinArrayItem = arr => {
    if (!(arr || []).length) {
        return null;
    }

    return arr.reduce((a, b) => { return a < b ? a : b; });
};

const uniqueIds = (items, field) => {
    const idsObj = flatten(items)
        .map(item => item[field])
        .reduce((accum, item) => {
            accum[item] = 1;
            return accum;
        }, {});
    return Object.keys(idsObj)
        .map(item => Number(item))
        .sort();
};

const getDataByKeyFromArray = (array, key) => {
    return array.reduce((acc, data) => {
        if (!data[key]) {
            return acc.concat(data);
        }

        if (Array.isArray(data[key])) {
            return acc.concat(getDataByKeyFromArray(data[key], key));
        }

        return acc.concat(data[key]);
    }, []);
};

const getValuesByInputFieldSequence = (data, fieldSequence) => {
    return fieldSequence
        .filter(Boolean)
        .reduce((acc, field) => {
            if (!acc[field]) {
                if (Array.isArray(acc)) {
                    return getDataByKeyFromArray(acc, field);
                }

                return {};
            }

            if (Array.isArray(acc[field])) {
                return getDataByKeyFromArray(acc[field], field);
            }

            return acc[field];
        }, data);
};

const symmetricDiff = (a, b) => {
    return getUnique(arrayDiff(a, b).concat(arrayDiff(b, a)));
};

const copy = arr => arr.map(el => Object.assign({}, el));

const mapUniqueValues = (arr, key) => {
    const formattedArray = arr
        .map(el => el[key])
        .filter(Boolean);

    return getUnique(formattedArray);
};

const removeDuplicatesByKey = (array, key) => {
    return array.reduce((arr, item) => {
        const removed = arr.filter(i => i[key] !== item[key]);
        return removed.concat([item]);
    }, []);
};

const inlineArrayOfArrays = array => {
    return array.reduce((acc, internalArray) => {
        return acc.concat(forceArray(internalArray));
    }, []);
};

const getFirstElement = arr => {
    return (arr || [])[0] || {};
};

const joinMappedValues = (arr, field) => {
    return arr.map(el => el[field]).join(', ');
};

const getFirstSimpleElement = arr => {
    return (arr || [])[0];
};

const insertArray = (arr1, arr2, index) => {
    const firstPart = arr1.slice(0, index);
    const secondPart = arr1.slice(index);

    return firstPart.concat(arr2).concat(secondPart);
};

/**
 * Creates array of provided length with copies of provided value
 * @template {any} T
 * @param {T} value
 * @param {number} length
 * @returns {Array<T>}
 */
const populateArray = (value, length) => {
    if (length < 1 || !Number.isInteger(length)) {
        throw new Error('Length must be positive integer');
    }

    return new Array(length).fill(value, 0, length);
};

const areArraysEqual = (arrX, arrY) => {
    if (!Array.isArray(arrX) || !Array.isArray(arrY)) {
        return arrX === arrY;
    }

    if (arrX.length !== arrY.length) {
        return false;
    }

    const sortedX = arrX.sort();
    const sortedY = arrY.sort();

    return sortedX.every((value, index) => value === sortedY[index]);
};

/**
 * Removes empty values (null, undefined, or empty strings) from the end of an array.
 *
 * @param {Array} arr - The input array
 * @returns {Array} A new array with trailing empty values removed
 *
 * @example
 * Input: [1, 2, '', null, 3, '', undefined]
 * Output: [1, 2, '', null, 3]
 */
const removeEmptyValuesFromEnd = arr => {
    let i = (arr || []).length - 1;

    while (i >= 0 && (arr[i] === null || arr[i] === undefined || arr[i] === '')) {
        i--;
    }

    return arr.slice(0, i + 1);
};

module.exports = {
    copy,
    flatten,
    range,
    forceArray,
    isEmptyArray,
    arrayDiff,
    arraySimilar,
    getUnique,
    getUniqueArray,
    getUniqueByKey,
    sortObjectsByKey,
    hasItem,
    deepCopyArrayOfObjects,
    getMaxArrayItem,
    getMinArrayItem,
    uniqueIds,
    getValuesByInputFieldSequence,
    symmetricDiff,
    sortObjectsByTwoKey,
    mapUniqueValues,
    removeDuplicatesByKey,
    inlineArrayOfArrays,
    getFirstElement,
    joinMappedValues,
    getFirstSimpleElement,
    insertArray,
    populateArray,
    areArraysEqual,
    isArray,
    removeEmptyValuesFromEnd,
};
