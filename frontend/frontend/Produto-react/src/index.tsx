import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/antd.css';
import 'nprogress/nprogress.css';
import { CoreProvider } from './context/CoreContext/';
import * as serviceWorker from './serviceWorker';
import { IntlProvider } from 'react-intl';


var locale = (navigator.languages && navigator.languages[0]) || navigator.language || 'pt-BR';
const msg = {
    'en-US': require('./i18n/en-US.json'),
    'pt-BR': require('./i18n/pt-BR.json'),
};


ReactDOM.render(
  <IntlProvider locale={locale} messages={msg["pt-BR"]}>
    <CoreProvider>
        <App />
    </CoreProvider>
  </IntlProvider>, 
  document.getElementById('root'));


serviceWorker.unregister();



