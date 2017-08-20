import'./RcChat.scss';
import React, { Component } from 'react';
import fb from '../../service/firebase';
import { Link, withRouter } from 'react-router-dom';
import RcChatContent from '../rc-chat-content/RcChatContent.jsx';
import RcCallGroup from '../rc-call-group/RcCallGroup.jsx';
import RcToolbar from '../rc-toolbar/RcToolbar.jsx';
import RcChatInput from '../rc-chat-input/RcChatInput.jsx';
import { observer, Provider, inject } from 'mobx-react';
import stores from '../../stores';

@observer
export default class RcChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      speed: 10,
      rcChatInputVal: ''
    }
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(evt) {
    evt.preventDefault();
  }
  render() {
    return (
      <Provider chats={stores.chatStore}>
      <div className="rc-chat-container">
        <RcToolbar />
        <RcCallGroup />
        <RcChatContent />
        <RcChatInput value={this.state.rcChatInputVal} onSubmit={this.onSubmit} />
      </div>
      </Provider>
    )
  }
}
