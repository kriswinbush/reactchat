import './RcChatBubble.scss';
import React, {Component} from 'react';
import Avatar from 'material-ui/Avatar';


export default class RcChatBubble extends Component {
   constructor(props) {
     super(props);
     this.style = {

     }
   }
  render() {
    return (
      <li className="rc-chat-bubble-container">
        <div className="chat-bubble-avatar">
          <Avatar size={30} src="https://placeimg.com/640/480/nature" />
        </div>
        <div className="chat-bubble-text">
          <header>from some user</header>
          <main> asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasfd</main>
          <footer> and we out</footer>
        </div>
      </li>
    )
  }
}