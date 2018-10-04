import React from 'react';

import { I18nextProvider } from 'react-i18next';

// import { getCurrentLocale, getLocaleData } from 'grommet/utils/Locale';
import { Provider } from 'react-redux';
import { initialize } from './actions/session';
import store from './store';
import Main from './components/Main';

import i18n from './messages';

// const locale = getCurrentLocale();
// addLocaleData(en);
// let messages;
// try {
//   messages = require(`./messages/${locale}`);
// } catch (e) {
//   messages = require('./messages/en-US');
// }
// const localeData = getLocaleData(messages, locale);

if (window.location.pathname !== '/login') {
  store.dispatch(initialize(window.location.pathname));
}

export default () => (
  <Provider store={store}>

    <I18nextProvider i18n={i18n}>
      <Main />
    </I18nextProvider>
  </Provider>
);
