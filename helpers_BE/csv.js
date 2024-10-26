
const CELL_DEFAULT_TYPE = 'text';
// 'text' used to be more user-friendly. Equal to JS type 'string'. See validateText() in dataValidator
const CELL_TYPE_DATE = 'date';
const CELL_TYPE_TIME = 'time';
const CELL_TYPE_BOOLEAN = 'boolean';
const CELL_TYPE_NUMBER = 'number';
const HEADER_KEY_TYPE = 'type';
const HEADER_KEY_MIN_TIME = 'min_time';
const HEADER_KEY_MAX_TIME = 'max_time';
const HEADER_KEY_UPDATE = 'update';
const HEADER_KEY_MERGE = 'merge';
const HEADER_KEY_DRIVER_PHONE = 'driver_phone';

const CELL_TIME_FORMAT = 'HH:mm';

const FIRST_HEADER_KEY = HEADER_KEY_TYPE;

const CELL_UPDATE_VALUES = [0, 1];

/**
 * Assigns an `order` property to each item in an array, based on its index in the array.
 *
 * @function
 * @param {Array<Object>} items - The array of objects to be processed. Each object will have an
 * `order` property added or modified.
 * @returns {Array<Object>} The modified array of objects with an added or updated `order` property.
 *
 * @example
 * const items = [{ name: 'Item 1' }, { name: 'Item 2' }, { name: 'Item 3' }];
 * const orderedItems = buildHeaderOrderByIndex(items);
 * console.log(orderedItems);
 * // Output:
 * // [
 * //   { name: 'Item 1', order: 1 },
 * //   { name: 'Item 2', order: 2 },
 * //   { name: 'Item 3', order: 3 }
 * // ]
 */
const buildHeaderOrderByIndex = items => {
    return items.map((i, index) => {
        i.order = index + 1;

        return i;
    });
};

module.exports = {
    CELL_DEFAULT_TYPE,
    CELL_TYPE_DATE,
    CELL_TYPE_TIME,
    CELL_TYPE_BOOLEAN,
    CELL_TYPE_NUMBER,
    HEADER_KEY_TYPE,
    HEADER_KEY_MIN_TIME,
    HEADER_KEY_MAX_TIME,
    HEADER_KEY_UPDATE,
    HEADER_KEY_MERGE,
    HEADER_KEY_DRIVER_PHONE,
    CELL_TIME_FORMAT,
    FIRST_HEADER_KEY,
    CELL_UPDATE_VALUES,

    buildHeaderOrderByIndex,
};
