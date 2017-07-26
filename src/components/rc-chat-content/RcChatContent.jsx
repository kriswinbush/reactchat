import './RcChatContent.scss';
import React, {Component} from 'react';
import Avatar from 'material-ui/Avatar';
import RcChatBubble from '../rc-chat-bubble/RcChatBubble.jsx';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
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
const withAlt
export default class RcChatContent extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {

  }
  render() {
    return (
      <div className="rc-chat-content">
        <h1>Convo</h1>
        <List>
          <ListItem >
            <RcChatBubble />
          </ListItem>
          <Subheader>Today</Subheader>
          <ListItem
            leftAvatar={<Avatar src="http://lorempixel.com/400/200/cats" />}
            rightIconButton={rightIconMenu}
            primaryText="Brendan Lim"
            secondaryText={
              <p>
                <span style={{color: darkBlack}}>Brunch this weekend?</span><br />
                I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
              </p>
            }
            secondaryTextLines={2}
          />
          <Divider inset={true} />
          </List>
        <ul>
            <RcChatBubble />
          
          
            <RcChatBubble />
          
          
            <RcChatBubble />
          
        </ul>
      </div>
    )
  }
}
