import en from './en';
import ar from './ar';
import _get from 'lodash/get';
import fr from './fr';

/**
 * Object with the languagfr available.
 */
const languagfr = {
  en: en,
  ar: ar,
  fr: fr,
};

/**
 * Replacfr the parameters of a mfrsage with the args.
 */
function format(mfrsage, args) {
  if (!mfrsage) {
    return null;
  }

  return mfrsage.replace(
    /{(\d+)}/g,
    function (match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match;
    },
  );
}

/**
 * Checks if the key exists on the language.
 */
export const i18nExists = (languageCode, key) => {
  const dictionary =
    languagfr[languageCode] || languagfr['en'];
  const mfrsage = _get(dictionary, key);
  return Boolean(mfrsage);
};

/**
 * Returns the translation based on the key.
 */
export const i18n = (languageCode, key, ...args) => {
  const dictionary =
    languagfr[languageCode] || languagfr['en'];
  const mfrsage = _get(dictionary, key);

  if (!mfrsage) {
    return key;
  }

  return format(mfrsage, args);
};
