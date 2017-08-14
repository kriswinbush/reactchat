import React, { Component } from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors';
import { inject, Provider, observer } from 'mobx-react';

@inject('stores') @observer
export default class RightIconMenu extends Component {
  constructor(props) {
    super(props);
    this.cEventHandler = this.cEventHandler.bind(this);
  }

  cEventHandler(event) {
    event.preventDefault();
    this.props.stores.peerStore.makePeerConnection(this.props.chat.user)
  }

  render() {
    //Or Add chat bubble user as contact send req
    return (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem onClick={this.cEventHandler}>Voice Call</MenuItem>
        <MenuItem onClick={this.cEventHandler}>Video Call</MenuItem>
        <MenuItem onClick={this.cEventHandler}>Voice Mail</MenuItem>
        <MenuItem onClick={this.cEventHandler}>Video Mail</MenuItem>
      </IconMenu>
    )
  }
}

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);
