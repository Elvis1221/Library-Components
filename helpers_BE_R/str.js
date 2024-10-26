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

const findSubString = (array, key) => {
  return array.find(el => key.includes(el));
};

const isPositiveBoolean = str => str === 'true';

const isId = input => {
  const digitsReg = /^\d+$/;
  return digitsReg.test(input);
};

const camelToSnakeCase = str => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

export {
  buildReplacerWithTags,
  camelToSnakeCase,
  findSubString,
  getSuffixes,
  isId,
  isPositiveBoolean,
};
