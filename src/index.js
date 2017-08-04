import React from 'react';
import ReactDom, {render} from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import App from './components/App.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import * as mobx from 'mobx'
import { Provider } from 'mobx-react';
import stores from './stores';
import RcMobxRouter from './hoc/RcMobxRouter';
mobx.useStrict(true);
injectTapEventPlugin();
render((
  <Provider stores={stores}>
    <BrowserRouter history={stores.navStore.history}>
      <App />
    </BrowserRouter>
  </Provider>
), document.querySelector('#root'));