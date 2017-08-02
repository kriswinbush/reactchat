import './RcChatContent.scss';
import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import RcChatBubble from '../rc-chat-bubble/RcChatBubble.jsx';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { observer, inject } from 'mobx-react';

@inject('chats') @observer
export default class RcChatContent extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  render() {
    let url = "http://lorempixel.com/400/200";
    const pix = ['transport', 'nature', 'fashion', 'nightlife', 'food', 'sports', 'technics', 'animals', 'cats', 'city', 'people', 'abstract', 'business'];
    const {filteredChatMessages, chatMessages} = this.props.chats    
    return (
      <div className="rc-chat-content-container">
        <h1>Convo</h1>
        <div className="content-list">
          <List>
            <Subheader>Today</Subheader>
            <Divider inset={true} />

            {chatMessages.entries().map((chat, id) => {
              chat = chat[1].msg;
              return (
                <ListItem
                  key={id}
                  leftAvatar={<Avatar src={`${url}/${pix[7]}`} />}
                  rightIconButton={rightIconMenu}
                  primaryText={chat.user}
                  secondaryText={
                    <p>
                      <span style={{ color: darkBlack }}>{chat.group}</span><br />
                      {chat.msg}
                    </p>
                  }
                  secondaryTextLines={2}
                />
              )
            }).reverse()}
            <Subheader>Yesterday</Subheader>
            <Divider inset={true} />
          </List>
        </div>
      </div>
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

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Reply</MenuItem>
    <MenuItem>Forward</MenuItem>
    <MenuItem>Delete</MenuItem>
  </IconMenu>
);
