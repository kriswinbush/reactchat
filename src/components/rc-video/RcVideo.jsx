import './RcVideo.scss';
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import {blue500, red500, fullWhite} from 'material-ui/styles/colors';

@inject('stores') @observer
export default class RcVideo extends Component {
  constructor(props) {    
    super(props);
    this.eHandler = this.eHandler.bind(this);
  }

  eHandler(event) {
    event.preventDefault();
    this.props.stores.uiStore.closeVideo()
      .then(() => {
        this.props.stores.peerStore.disconnectMyPeer();
      })
  }

  render() {
    let styles = {
      largeIcon: { width: 60, height: 60 },
      large: { width: 120, height: 120, padding: 0 }
    };

    return (
      <div className="rc-video-container">
        <div className="center-video">
          <div className="close-button" >
            <IconButton iconStyle={styles.largeIcon} style={styles.large} onClick={this.eHandler} tooltip="SVG Icon">
              <NavigationClose color={fullWhite} />
            </IconButton>
          </div>
          <div className="large-vid-container">
            <video ref={(video)=>{this.props.stores.peerStore.largeVidRef = video}}  id="large-vid" autoPlay></video>
          </div>
          <div className="small-vid-container">
            <video ref={(video)=>{this.props.stores.peerStore.smallVidRef = video}} id='small-vid' controls autoPlay></video>
          </div>
        </div>
      </div>
    )
  }
}
