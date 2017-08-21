import './RcContact.scss';
import React, {Component} from 'react';
import RcProfile from '../rc-profile/RcProfile.jsx';
import RcRecentContacts from '../rc-recent-contacts/RcRecentContacts.jsx';
import {inject, observer} from 'mobx-react';

import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';



@inject('stores') @observer
export default class RcContact extends Component {
  recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
  favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
  nearbyIcon = <IconLocationOn />;
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
    this.state = {
      selectedIndex: 0,
    };
  
    this.select = (index) => this.setState({selectedIndex: index});
  }
  clickHandler(evt) {
    this.props.stores.uiStore.toggleSideContainer();
  }
  render() {
    return (
      <div ref={(div)=>{this.props.stores.uiStore.sideDrawerElRef = div}} className="rc-contact-container">
        <RcProfile />
        <RcRecentContacts />
        <div className="flex-spacer"></div>
        <Paper zDepth={1}>
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            label="Recents"
            icon={this.recentsIcon}
            onClick={() => this.select(0)}
          />
          <BottomNavigationItem
            label="Favorites"
            icon={this.favoritesIcon}
            onClick={() => this.select(1)}
          />
          <BottomNavigationItem
            label="Nearby"
            icon={this.nearbyIcon}
            onClick={() => this.select(2)}
          />
        </BottomNavigation>
      </Paper>
      </div>
    )
  }
}