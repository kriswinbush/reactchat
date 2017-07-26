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

  componentDidMount() {

  }
  render() {
    return (
      <Tabs>
        <Tab label="Recent" >
          <List>
            <Subheader>Recent chats</Subheader>
            <ListItem
              primaryText="Brendan Lim"
              leftAvatar={<Avatar src="http://lorempixel.com/400/200/city" />}
              rightIcon={<CommunicationChatBubble />}
            />
            <ListItem
              primaryText="Chris Collins"
              leftAvatar={<Avatar src="http://lorempixel.com/400/200/animals" />}
              rightIcon={<CommunicationChatBubble />}
            />
            <ListItem
              primaryText="Grace Ng"
              leftAvatar={<Avatar src="http://lorempixel.com/400/200/cats" />}
              rightIcon={<CommunicationChatBubble />}
            />
            <ListItem
              primaryText="Kerem Suer"
              leftAvatar={<Avatar src="http://lorempixel.com/400/200/technics" />}
              rightIcon={<CommunicationChatBubble />}
            />
            <ListItem
              primaryText="Raquel Parrado"
              leftAvatar={<Avatar src="http://lorempixel.com/400/200/people" />}
              rightIcon={<CommunicationChatBubble />}
            />
          </List>
          <Divider />
          <List>
            <Subheader>Previous chats</Subheader>
            <ListItem
              primaryText="Chelsea Otakan"
              leftAvatar={<Avatar src="http://lorempixel.com/400/200/nightlife" />}
            />
            <ListItem
              primaryText="James Anderson"
              leftAvatar={<Avatar src="http://lorempixel.com/400/200/transport" />}
            />
          </List>
        </Tab>
        <Tab label="Contacts" >
          <List>
            <ListItem
              primaryText="Chelsea Otakan"
              leftIcon={<ActionGrade color={pinkA200} />}
              rightAvatar={<Avatar src="http://lorempixel.com/400/200/people" />}
            />
            <ListItem
              primaryText="Eric Hoffman"
              insetChildren={true}
              rightAvatar={<Avatar src="http://lorempixel.com/400/200/cats" />}
            />
            <ListItem
              primaryText="James Anderson"
              insetChildren={true}
              rightAvatar={<Avatar src="http://lorempixel.com/400/200/abstract" />}
            />
            <ListItem
              primaryText="Kerem Suer"
              insetChildren={true}
              rightAvatar={<Avatar src="http://lorempixel.com/400/200/business" />}
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
              rightAvatar={<Avatar src="http://lorempixel.com/400/200/fashion" />}
            />
            <ListItem
              primaryText="Adham Dannaway"
              insetChildren={true}
              rightAvatar={<Avatar src="http://lorempixel.com/400/200/transport" />}
            />
            <ListItem
              primaryText="Allison Grayce"
              insetChildren={true}
              rightAvatar={<Avatar src="http://lorempixel.com/400/200/technics" />}
            />
            <ListItem
              primaryText="Angel Ceballos"
              insetChildren={true}
              rightAvatar={<Avatar src="http://lorempixel.com/400/200/sports" />}
            />
          </List>
        </Tab>
      </Tabs>
    )
  }
}