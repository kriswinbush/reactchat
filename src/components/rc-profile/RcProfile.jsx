import './RcProfile.scss';
import React, {Component} from 'react';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {inject, observer} from 'mobx-react';

@inject('stores') @observer
export default class RcProfile extends Component {
  constructor(props) {
    super(props);
    this.user = this.props.stores.userStore;
    this.style = {'margin':'10px'}
  }
  coomponentDidMount() {}
  render() {
    return (
      <div className="rc-profile-container">
       <Avatar
          src={this.user.profile.avatarUrl}
          size={40}
          style={this.style}
        />
        <div>
          <h4>{this.user.profile.userNick}</h4>
          <p>{this.user.profile.desc}</p>
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