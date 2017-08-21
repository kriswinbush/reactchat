import './RcContact.scss';
import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RcProfile from '../rc-profile/RcProfile.jsx';
import RcRecentContacts from '../rc-recent-contacts/rc-recent-contacts.jsx';
import { TweenMax, Bounce } from 'gsap';

export default class RcContact extends Component {
  constructor(props) {
    super(props);
    this.state = { opened: false};
    this.animeDiv;
    this.handler = this.handler.bind(this);
  }

  componentDidMount() {}

  handler(evt) {
    let anime = this.state.opened ? ( 
      TweenMax.to(this.animeDiv,1,{opacity:1,right:0}).reverse(),
      this.setState({opened:false})
    ):( 
      TweenMax.to(this.animeDiv,1,{opacity:1,right:100}),
      this.setState({opened:true})
    )
  }
  render() {
    return (
      <div ref={(div)=>{this.animeDiv = div}} onClick={this.handler} className="rc-contact-container">
        <RcProfile userName='Kris J Winbush' />
        <RcRecentContacts />
      </div>
    )
  }
}