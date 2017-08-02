import React from 'react';
import ReactDom, {render} from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import App from './components/App.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import * as mobx from 'mobx'
mobx.useStrict(true);
injectTapEventPlugin();
render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
), document.querySelector('#root'));