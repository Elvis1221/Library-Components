import diacritics from 'diacritics';
import escape from 'pg-escape';
import Sequelize from 'sequelize';

const buildReplaceChar = value => {
  const char = diacritics.diacriticsMap[value] || value;
  const replaceItem = diacritics.replacementList.find(item => item.base === char);
  if (!replaceItem) {
    return char;
  }

  return `(${char}|${replaceItem.chars.split('').join('|')})`;
};

const formatStringWithDiacritics = str => {
  return str
    .toLowerCase()
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .split('')
    .reduce((acc, char) => {
      const newChar = buildReplaceChar(char);

      return acc.concat(newChar);
    }, '');
};

const buildSearchStrWithDiacritics = str => {
  const formattedString = formatStringWithDiacritics(str);
  const searchStr = formattedString.replace('_', '\\_');

  return `%${searchStr}%`;
};

const buildSimilar = (colName, searchQuery) => {
  return Sequelize.literal(escape(`LOWER(${colName}) SIMILAR TO %L`, searchQuery));
};

const buildSimilarToSearchQuery = (colName, str) => {
  const searchPattern = buildSearchStrWithDiacritics(str);

  return buildSimilar(colName, searchPattern);
};

export {
  buildSimilarToSearchQuery,
};
