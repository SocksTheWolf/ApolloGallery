const translations = {
  'en': require('./translations/en.json'),
  'pl': require('./translations/pl.json')
};

const translate = (c, text) => {
  const defaultLanguage = 'en';
  let language;
  const acceptLanguage = c.req.header('Accept-Language');

  if (acceptLanguage) {
    language = acceptLanguage.split('-')[0].split(',')[0];
  };

  try {
    if (translations[language] && translations[language][text]) {
      return translations[language][text];
    } else if (translations[defaultLanguage] && translations[defaultLanguage][text]) {
      concole.error('no "' + language + '" translation in for: ' + text);
      return translations[defaultLanguage][text];
    } else {
      throw new Error("no DEFAULT translation in for: " + text);
    }
  } catch (error) {
    console.error(`Translation error: ${error.message}`);
    return text;
  }
};

export default translate;