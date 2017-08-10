import './App.scss';
import "babel-polyfill";
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RcAuth from '../components/rc-auth/RcAuth.jsx';
import RcMain from '../routes/rc-main/RcMain.jsx';
import AuthCheck from '../hoc/AuthCheck.jsx';
import { Switch, Route, Link } from 'react-router-dom';
import RcVideo from '../components/rc-video/RcVideo.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isVideoConf:true};
  }
  previousLocation = this.props.location;
  componentWillUpdate(nextProps) {
      console.log(nextProps) 
  }
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