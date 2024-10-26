import { camelToSnakeCase } from './str';

const groupByField = (array, field) => {
  return array
    .reduce((acc, item) => {
      const key = item[field];

      acc[key] = acc[key] || [];
      acc[key].push(item);

      return acc;
    }, {});
};
const transposeArrayToObjectByUniqueKey = (array, field) => {
  return array
    .reduce((acc, item) => {
      const key = item[field];
      acc[key] = item;
      return acc;
    }, {});
};

const pickExisting = (obj, keys, options) => {
  const {
    toSnake,
  } = options || {};

  return Object.keys(obj)
    .filter(key => keys.includes(key))
    .reduce((accum, key) => {
      if (typeof obj[key] === 'undefined') return accum;

      let formattedKey = key;

      if (toSnake) {
        formattedKey = camelToSnakeCase(key);
      }

      return { ...accum, [formattedKey]: obj[key] };
    }, {});
};

const parseToJSON = obj => {
  try {
    return obj.toJSON();
  } catch (error) {
    return obj;
  }
};

export {
  groupByField,
  parseToJSON,
  pickExisting,
  transposeArrayToObjectByUniqueKey,
};
