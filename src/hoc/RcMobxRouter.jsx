import React, { Component } from 'react';
import { BrowserRouter,Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { observable, computed } from 'mobx';

class RcMobxRouter extends Component {
  render() {
    return (
      <Router history={this.props.history} children={this.props.children} />
    )
  }
}
export default { RcMobxRouter };
