import './RcProfile.scss';
import React, {Component} from 'react';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

export default class RcProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.style = {
      'margin':'10px'
    }
  }
  coomponentDidMount() {

  }
  render() {
    return (
      <div className="rc-profile-container">
       <Avatar
          src="http://lorempixel.com/400/200"
          size={40}
          style={this.style}
        />
        <div>
          <h4>{this.props.userName}</h4>
          <p>Some sub info about the user</p>
        </div>
        
        <div className="flex-spacer"></div>
        <IconButton
          iconStyle={{color:'white'}}
          iconClassName="material-icons"
          tooltip="Ligature"
          >edit</IconButton>
      </div>
    )
  }
}