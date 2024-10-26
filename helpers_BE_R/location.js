import { getNames } from 'i18n-iso-countries';

import { LANGUAGES_CODES } from '../constants/translations';

const preparedCountryCodes = (countryCodes, user = {}) => {
  const language = user.lang || LANGUAGES_CODES.EN;

  const countryNamesObject = getNames(language, { select: 'all' });
  return countryCodes
    .map(item => ({
      ...item,
      country: (countryNamesObject[item.country_code_alpha2] || [''])[0],
    }))
    .sort((a, b) => a.country.localeCompare(b.country));
};

export {
  preparedCountryCodes,
};
