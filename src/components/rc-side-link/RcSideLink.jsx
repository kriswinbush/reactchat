import './RcSideLink.scss';
import React, {Component} from 'react';
import IconButton from 'material-ui/IconButton';

export default class RcSideLink extends Component {
  constructor(props) {
    super(props)
    this.state = {};

  }
  componentDidMount() {

  }

  render() {
    return (
      <div className="rc-side-link-container">
        <ul>
          <li>
            <IconButton
              iconStyle={{color:'white'}}
              iconClassName="material-icons"
              tooltip="Home"
            >home</IconButton>
          </li>
          <li>
            <IconButton
              iconStyle={{color:'white'}}
              iconClassName="material-icons"
              tooltip="Video Call"
            >video_call</IconButton>
          </li>
          <li>
            <IconButton
              iconStyle={{color:'white'}}
              iconClassName="material-icons"
              tooltip="Private Chat"
            >chat</IconButton>
          </li>
          <li>
            <IconButton
              iconStyle={{color:'white'}}
              iconClassName="material-icons"
              tooltip="Screen Share"
            >screen_share</IconButton>
          </li>
          <li>
            <IconButton
              iconStyle={{color:'white'}}
              iconClassName="material-icons"
              tooltip="Call"
            >call</IconButton>
          </li>
          <li>
            <IconButton
              iconStyle={{color:'white'}}
              iconClassName="material-icons"
              tooltip="Settings"
            >settings</IconButton>
          </li>
          <li>
            <IconButton
              iconStyle={{color:'white'}}
              iconClassName="material-icons"
              tooltip="Ligature"
            >power_settings_new</IconButton>
          </li>
        </ul>
      </div>
    )
  }

}