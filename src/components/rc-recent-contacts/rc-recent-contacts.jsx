import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Avatar from 'material-ui/Avatar';
import {pinkA200, transparent} from 'material-ui/styles/colors';

export default class RcRecentContacts extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {}
  render() {
    return (
      <Tabs>
        <Tab label="Recent" >
          <List>
            <Subheader>Recent chats</Subheader>
            <ListItem
              primaryText="Brendan Lim"
              leftAvatar={<Avatar src="https://placeimg.com/640/480/nature" />}
              rightIcon={<CommunicationChatBubble />}
            />
            <ListItem
              primaryText="Chris Collins"
              leftAvatar={<Avatar src="https://placeimg.com/640/480/any" />}
              rightIcon={<CommunicationChatBubble />}
            />
            <ListItem
              primaryText="Grace Ng"
              leftAvatar={<Avatar src="https://placeimg.com/640/480/people" />}
              rightIcon={<CommunicationChatBubble />}
            />
            <ListItem
              primaryText="Kerem Suer"
              leftAvatar={<Avatar src="https://placeimg.com/640/480/tech" />}
              rightIcon={<CommunicationChatBubble />}
            />
            <ListItem
              primaryText="Raquel Parrado"
              leftAvatar={<Avatar src="https://placeimg.com/640/480/architecture" />}
              rightIcon={<CommunicationChatBubble />}
            />
          </List>
          <Divider />
          <List>
            <Subheader>Previous chats</Subheader>
            <ListItem
              primaryText="Chelsea Otakan"
              leftAvatar={<Avatar src="https://placeimg.com/640/480/nature" />}
            />
            <ListItem
              primaryText="James Anderson"
              leftAvatar={<Avatar src="https://placeimg.com/640/480/tech" />}
            />
          </List>
        </Tab>
        <Tab label="Contacts" >
          <List>
            <ListItem
              primaryText="Chelsea Otakan"
              leftIcon={<ActionGrade color={pinkA200} />}
              rightAvatar={<Avatar src="https://placeimg.com/640/480/any" />}
            />
            <ListItem
              primaryText="Eric Hoffman"
              insetChildren={true}
              rightAvatar={<Avatar src="https://placeimg.com/640/480/nature" />}
            />
            <ListItem
              primaryText="James Anderson"
              insetChildren={true}
              rightAvatar={<Avatar src="https://placeimg.com/640/480/people" />}
            />
            <ListItem
              primaryText="Kerem Suer"
              insetChildren={true}
              rightAvatar={<Avatar src="https://placeimg.com/640/480/tech" />}
            />
          </List>
          <Divider inset={true} />
          <List>
            <ListItem
              primaryText="Adelle Charles"
              leftAvatar={
                <Avatar
                  color={pinkA200} backgroundColor={transparent}
                  style={{left: 8}}
                >
                  A
                </Avatar>
              }
              rightAvatar={<Avatar src="https://placeimg.com/640/480/nature" />}
            />
            <ListItem
              primaryText="Adham Dannaway"
              insetChildren={true}
              rightAvatar={<Avatar src="https://placeimg.com/640/480/any" />}
            />
            <ListItem
              primaryText="Allison Grayce"
              insetChildren={true}
              rightAvatar={<Avatar src="https://placeimg.com/640/480/tech" />}
            />
            <ListItem
              primaryText="Angel Ceballos"
              insetChildren={true}
              rightAvatar={<Avatar src="https://placeimg.com/640/480/architecture" />}
            />
          </List>
        </Tab>
      </Tabs>
    )
  }
}
