import './RcSideLink.scss';
import React, {Component} from 'react';
import IconButton from 'material-ui/IconButton';
import { inject, Provider, observer } from 'mobx-react';

@inject('stores') @observer
export default class RcSideLink extends Component {
  constructor(props) {
    super(props);
    this.auth = this.props.stores.authStore;
    this.state = {};
    this.clickHandler = this.clickHandler.bind(this);
    this.homeHandler = this.homeHandler.bind(this);
  }
  componentDidMount() {

  }
  homeHandler() {
    this.props.stores.routing.push('/auth')
  }
  clickHandler(event){
    var { target } = event;
    event.preventDefault();
    this.auth.signOut();
  }
  render() {
    return (
      <div className="rc-side-link-container">
        <ul>
          <li id='home'>
            <IconButton
              iconStyle={{color:'green'}}
              iconClassName="material-icons"
              tooltip="Home"
              onClick={this.homeHandler}
              name='home'
            >home</IconButton>
          </li>
          <li></li>
          <li id='video' name='video' onClick={this.clickHandler}>
            <IconButton
              iconStyle={{color:'white'}}
              iconClassName="material-icons"
              tooltip="Video Call"
            >video_call</IconButton>
          </li>
          <li id='private' name='private' onClick={this.clickHandler}>
            <IconButton
              iconStyle={{color:'white'}}
              iconClassName="material-icons"
              tooltip="Private Chat"
            >chat</IconButton>
          </li>
          <li id='screen' name='screen' onClick={this.clickHandler}>
            <IconButton
              iconStyle={{color:'white'}}
              iconClassName="material-icons"
              tooltip="Screen Share"
            >screen_share</IconButton>
          </li>
          <li id='voice' name='voice' onClick={this.clickHandler}>
            <IconButton
              iconStyle={{color:'white'}}
              iconClassName="material-icons"
              tooltip="Call"
            >call</IconButton>
          </li>
          <li id='settings' name='settings' onClick={this.clickHandler}>
            <IconButton
              iconStyle={{color:'white'}}
              iconClassName="material-icons"
              tooltip="Settings"
            >settings</IconButton>
          </li>
          <li></li>
          <li id='signout' name='signout' onClick={this.clickHandler}>
            <IconButton
              iconStyle={{color:'red'}}
              iconClassName="material-icons"
              tooltip="Sign Out"
            >power_settings_new</IconButton>
          </li>
        </ul>
      </div>
    )
  }

}