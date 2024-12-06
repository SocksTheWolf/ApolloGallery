const translations = {
  'en': require('../locale/en.json'),
  'pl': require('../locale/pl.json')
};

const translate = (c) => {
  const fallbackLanguage = 'en';
  let language;
  const acceptLanguage = c.req.header('Accept-Language');

  if (acceptLanguage) {
    const languages = acceptLanguage.split(',').map(lang => lang.split(';')[0].split('-')[0].trim());
    for (let lang of languages) {
      if (translations[lang]) {
        language = lang;
        break;
      }
    }
  } else {
    language = fallbackLanguage;
  }

  return (text) => {
    try {
      if (translations[language]?.[text]) {
        return translations[language][text];
      } else if (translations[fallbackLanguage]?.[text]) {
        console.error(`No "${language}" translation in for: ${text}`);
        return translations[fallbackLanguage][text];
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
