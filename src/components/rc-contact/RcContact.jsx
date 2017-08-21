import './RcContact.scss';
import React, {Component} from 'react';
import RcProfile from '../rc-profile/RcProfile.jsx';
import RcRecentContacts from '../rc-recent-contacts/rc-recent-contacts.jsx';
import {inject, observer} from 'mobx-react';
import IconButton from 'material-ui/IconButton';
import NavigationMenuIcon from 'material-ui/svg-icons/navigation/menu';

@inject('stores') @observer
export default class RcContact extends Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }
  clickHandler(evt) {
    this.props.stores.uiStore.toggleSideContainer();
  }
  render() {
    return (
      <div ref={(div)=>{this.props.stores.uiStore.sideDrawerElRef = div}} className="rc-contact-container">
        <RcProfile />
        <RcRecentContacts />
        <IconButton touch={true} onClick={this.clickHandler}>
          <NavigationMenuIcon />
        </IconButton>
      </div>
    )
  }
}