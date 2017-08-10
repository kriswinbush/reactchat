import './RcVideo.scss';
import React from 'react';
import { observer, inject } from 'mobx-react';
import { Switch, Route, Link } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import {blue500, red500, fullWhite} from 'material-ui/styles/colors';
@inject('stores') @observer
export default class RcVideo extends React.Component {
    constructor(props) {
        super(props);
        this.lgVideoRef;
        this.smVideRef;
        navigator.mediaDevices.getUserMedia({audio:true, video: {width:1280, heigh:720}})
        .then(stream => this.lgVideoRef.srcObject = stream)
        .then(()=> console.log('should be streaming something'))

        this.eHandler = this.eHandler.bind(this);
    }
    eHandler(event) {
        event.preventDefault();
        this.props.stores.uiStore.toggleVideoView();
    }
    render() {
        let styles = {
            largeIcon: {
                width: 60,
                 height: 60
            },
            large: {
                width: 120,
                height: 120,
                padding: 0,
            }
        }
        
        return (
            <div className="rc-video-container">
                <div className="center-video">
                    <div className="close-button" >
                        <IconButton iconStyle={styles.largeIcon} style={styles.large} onClick={this.eHandler} tooltip="SVG Icon">
                            <NavigationClose color={fullWhite} />
                        </IconButton>
                    </div>
                    <div className="large-vid-container">
                        <video ref={(video)=>{this.lgVideoRef = video}}  id="large-vid" controls></video>
                    </div>
                    <div className="small-vid-container">
                        <video ref={(video)=>{this.lgVideoRef = video}} id='small-vid'></video>
                    </div>
                </div>
            </div>
        )
    }
}