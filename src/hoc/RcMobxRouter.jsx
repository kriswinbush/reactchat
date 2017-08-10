import React, { Component } from 'react';
import { BrowserRouter,Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { observable, computed } from 'mobx';
import stores from '../stores';
class RcMobxRouter extends Component {
  constructor(props) {
    super(props);
    this.history = stores.navStore.history;
  }
  render() {
    return <BrowserRouter history={this.history} children={this.props.children} />
    
  }
}
export default RcMobxRouter;
