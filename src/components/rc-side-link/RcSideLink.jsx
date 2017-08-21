import './RcSideLink.scss';
import React, {Component} from 'react';
import IconButton from 'material-ui/IconButton';
import { inject, Provider, observer } from 'mobx-react';

@inject('stores') @observer
export default class RcSideLink extends Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
    this.homeHandler = this.homeHandler.bind(this);
    this.menuHandler = this.menuHandler.bind(this);
  }

  homeHandler() {
    this.props.stores.routing.push('/auth')
  }

  clickHandler(){
    this.props.stores.authStore.signOut();
  }

  menuHandler() {
    this.props.stores.uiStore.toggleSideContainer();
  }

  render() {
    return (
      <div className="rc-side-link-container">
        <ul>
          <li id='menu'>
            <IconButton
              iconStyle={{color:'green'}}
              iconClassName="material-icons"
              tooltip="Contact Menu"
              onClick={this.menuHandler}
              name='Contacts'
            >menu</IconButton>
          </li>
          <li></li>
          <li id='home' name='video' onClick={this.clickHandler}>
            <IconButton
              iconStyle={{color:'white'}}
              iconClassName="material-icons"
              tooltip="home"
            >home</IconButton>
          </li>
          <li id='private' name='private'>
            <IconButton
              iconStyle={{color:'white'}}
              iconClassName="material-icons"
              tooltip="Private Chat"
            >chat</IconButton>
          </li>
          <li id='screen' name='screen'>
            <IconButton
              iconStyle={{color:'white'}}
              iconClassName="material-icons"
              tooltip="Screen Share"
            >screen_share</IconButton>
          </li>
          <li id='voice' name='voice'>
            <IconButton
              iconStyle={{color:'white'}}
              iconClassName="material-icons"
              tooltip="Call"
            >call</IconButton>
          </li>
          <li id='settings' name='settings'>
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