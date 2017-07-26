import './RcContact.scss';
import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RcProfile from '../rc-profile/RcProfile.jsx';
import RcRecentContacts from '../rc-recent-contacts/rc-recent-contacts.jsx';

export default class RcContact extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {

  }
  render() {
    return (
      <div className="rc-contact-container">
        <RcProfile userName='Kris J Winbush' />
        <RcRecentContacts />
      </div>
    )
  }
}