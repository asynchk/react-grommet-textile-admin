
import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';

import enTranslation from './en_US';

i18n
  .use(reactI18nextModule) // if not using I18nextProvider
  .init({
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for react!!
    },
    resources: {
      en: {
        translation: enTranslation
      }
    },

    // react i18next special options (optional)
    react: {
      wait: false,
      bindI18n: 'languageChanged loaded',
      bindStore: 'added removed',
      nsMode: 'default'
    }
  });


export default i18n;
