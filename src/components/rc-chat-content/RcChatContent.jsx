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
import RightIconMenu from './right-icon-menu/RightIconMenu';
import RcVideo from '../rc-video/RcVideo';
import { Switch, Route, Link } from 'react-router-dom';

@inject('stores') @observer
export default class RcChatContent extends Component {
  constructor(props) {
    super(props);
    this.eventHandler = this.eventHandler.bind(this);
  }
  eventHandler(evt) {
    evt.preventDefault();
  }
  componentDidMount() {}
 
  render() {
    let url = "https://placeimg.com/640/480";
    const pix = ['tech', 'nature', 'people', 'architecture', 'animals'];
    const {filteredChatMessages, chatMessages} = this.props.stores.chatStore    
    return (
      <div className="rc-chat-content-container">
        <h1>Convo</h1>
        <div className="content-list">
          <ul>
          {chatMessages.entries().map((chat, id) => {
              const {msg} = chat[1];
              return (
                <li key={id}>
                  <div className="chat-bubble-container">
                    <span className="left-avatar">
                      <Avatar src={`${url}/${pix[Math.floor(Math.random() * pix.length)]}`} />
                    </span>
                    <div>
                      <div>{msg.user}</div>
                      <div>{msg.group}</div>
                    </div>
                    <div className="chat-msg"><h3>{msg.msg}</h3></div>
                    <div className='flex-spacer'></div>
                    <span className="right-menu">
                      <RightIconMenu chat={msg}/>
                    </span>
                  </div>
                </li>
              )
            }).reverse()}
          </ul>
        </div>
      </div>
    )
  }
}
