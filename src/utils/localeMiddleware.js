import parser from 'accept-language-parser';

const translations = {
  'en': () => require('../locale/en.json'),
  'pl': () => require('../locale/pl.json')
};

const translate = (c) => {
  const fallbackLanguage = 'en';
  const acceptLanguage = c.req.header('Accept-Language');
  let language = parser.pick(Object.keys(translations), acceptLanguage, { loose: true });

  return (text) => {
    if(!text) return language;
    try {
      const translation = translations[language]?.() || translations[fallbackLanguage]?.();
      if (translation?.[text]) {
        return translation[text];
      } else if (translations[fallbackLanguage]?.()[text]) {
        console.error(`No "${language}" translation in for: ${text}`);
        return translations[fallbackLanguage]()[text];
      } else {
        console.error(`No "${language}" & FALLBACK("${fallbackLanguage}") translation for: ${text}`);
        return text;
      }
    } catch (error) {
      console.error(`An unexpected translation error occurred for language "${language}" and text "${text}": ${error.message}`);
      return text;
    }
  };
};

export const translationMiddleware = async (c, next) => {
  c.t = translate(c);
  await next();
};

export const availableLocales = () => {
  return Object.keys(translations);
}