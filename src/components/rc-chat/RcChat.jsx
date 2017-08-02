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
  onSubmit(e) {
    e.preventDefault();
    console.log(e);
  }
  componentDidMount() {
    //const rootRef = fire.database().ref();
    //var d = rootRef.child('reactchat');
    //var i = rootRef.child('reactchat/users')
    //i.push().set({ id: 2, firstName: 'Kris', LastName: "WInbush", email: 'Kris.winbush@gmail.com' })
    //i.push().set({ id: 1, firstName: 'Kris', LastName: "WInbush", email: 'ks.nbush@gmail.com' })
    //const speedRef = d.child('speed');
    //speedRef.on('value', snap => {
      //this.setState({
        //speed: snap.val()
      //})
    //})
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
const RcHome = withRouter((props) => {
  console.log(props)
  return (
    <div className='rc-main-container'>
      <h1>Damn final made it home</h1>
        <RaisedButton label="Sign Out" primary={true} onClick={() => fire.auth().signOut().then(() => props.history.push('/'))} />
        <RaisedButton label="Sign Out" primary={true} onClick={() => props.history.push('/')} />
    </div>
  )
})
