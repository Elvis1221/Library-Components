const flatten = arr => [].concat.apply(...arr);

const forceArray = x => { return Array.isArray(x) ? x : [x]; };

const sortObjectsByKey = field => (a, b) => {
  if (a[field] < b[field]) {
    return 1;
  }
  if (a[field] > b[field]) {
    return -1;
  }
  return 0;
};

const pick = (obj, keys) => Object.keys(obj)
  .filter(key => keys.indexOf(key) >= 0)
  .reduce((acc, key) => ((acc[key] = obj[key], acc)), {});

const getUniqueByKey = (key, list) => {
  const f = (accum, item) => {
    accum[item[key]] = item;
    return accum;
  };
  const uniq = list.reduce(f, {});
  return Object.keys(uniq).map(k => uniq[k]);
};

const getUnique = arr => Array.from(new Set(arr));

const splitIntoChunk = (arr, chunkSize) => {
  const tempArray = [];

  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    tempArray.push(chunk);
  }

  return tempArray;
};

const mapUniqueValues = (arr, key) => {
  const formattedArray = arr
    .map(el => el[key])
    .filter(Boolean);

  return getUnique(formattedArray);
};

const getFirstSimpleElement = arr => {
  return (arr || [])[0];
};

export {
  flatten,
  forceArray,
  getUnique,
  getUniqueByKey,
  mapUniqueValues,
  pick,
  sortObjectsByKey,
  splitIntoChunk,
  getFirstSimpleElement,
};
