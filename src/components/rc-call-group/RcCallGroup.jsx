import './RcCallGroup.scss';
import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import AvVideoCall from 'material-ui/svg-icons/av/video-call';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

export default class RcCallGroup extends Component {
  constructor(props) {
    super(props);
    this.style = {
      margin: '10px',
      large: {
        color: '#26333b'
      },
    }
  }
  render() {
    return (
      <div className="rc-call-group-container">
        <IconButton
          iconClassName="material-icons"
          tooltip="Ligature"
          style={this.style.large}
        >voice_chat</IconButton>
        <IconButton
          iconClassName="material-icons"
          tooltip="Ligature"
        >group_work</IconButton>
        

        <div className="flex-spacer"></div>
        <Avatar src="https://placeimg.com/640/480/any" style={this.style} />
        <Avatar src="https://placeimg.com/640/480/animals" style={this.style} />
        <Avatar src="https://placeimg.com/640/480/architecture" style={this.style} />
        <Avatar src="https://placeimg.com/640/480/people" style={this.style} />
        <FloatingActionButton mini={true} secondary={true} style={this.style}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    )
  }
}