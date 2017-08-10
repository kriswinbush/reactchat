import React from 'react';
import ReactDom, {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './components/App.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import * as mobx from 'mobx'
import { Provider } from 'mobx-react';
import stores from './stores';
import RcMobxRouter from './hoc/RcMobxRouter';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import {Router} from 'react-router';

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();
stores.routing = routingStore;

const history = syncHistoryWithStore(browserHistory, routingStore);

mobx.useStrict(true);
injectTapEventPlugin();
render((
  <Provider stores={stores}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
), document.querySelector('#root'));