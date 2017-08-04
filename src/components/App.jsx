import './App.scss';
import "babel-polyfill";
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RcAuth from '../components/rc-auth/RcAuth.jsx';
import RcMain from '../routes/rc-main/RcMain.jsx';
import AuthCheck from '../hoc/AuthCheck.jsx';
import { Switch, Route } from 'react-router-dom';

export default class App extends React.Component {
  render() {

    return (
      <MuiThemeProvider>
        <div className="app">
            <Switch>
              <AuthCheck exact path='/' component={RcMain} /> 
              <Route path="/auth" component={RcAuth} />
            </Switch>
        </div>
      </MuiThemeProvider>
    )
  }
}