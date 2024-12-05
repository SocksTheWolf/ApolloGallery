const translations = {
  'en': require('../locale/en.json'),
  'pl': require('../locale/pl.json')
};

const translate = (c) => {
  const defaultLanguage = 'en';
  let language;
  const acceptLanguage = c.req.header('Accept-Language');

  if (acceptLanguage) {
    language = acceptLanguage.split('-')[0].split(',')[0];
  }

  return (text) => {
    try {
      if (translations[language] && translations[language][text]) {
        return translations[language][text];
      } else if (translations[defaultLanguage] && translations[defaultLanguage][text]) {
        console.error(`no "${language}" translation in for: ${text}`);
        return translations[defaultLanguage][text];
      } else {
        console.error(`no DEFAULT translation for: ${text}`);
      }
    } catch (error) {
      console.error(`Translation error for language "${language}" and text "${text}": ${error.message}`);
      return text;
    }
  };
};

export const translationMiddleware = async (c, next) => {
  c.t = translate(c);
  await next();
};
