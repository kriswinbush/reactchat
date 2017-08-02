import './RcChatInput.scss';
import React, { Component } from 'react';
import { inject, Provider, observer } from 'mobx-react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

@inject('chats') @observer
export default class RcChatInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: ''
    }
    this.submitHandler = this.submitHandler.bind(this)
    this.changeHandler = this.changeHandler.bind(this)
  }
  changeHandler(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.id;

    switch (name) {
      case 'msg':
        this.setState({ msg: event.target.value })
        break;
      case 'filter':
        this.props.chats.filter = target.value;
        break;
    }
  }
  submitHandler(event) {
    event.preventDefault()
    const { addChatMsg } = this.props.chats
    addChatMsg({ msg: this.state.msg })
  }
  render() {
    const { filter, addChatMsg } = this.props.chats
    return (
      <div>
        <div className='rc-chat-input-container'>
          <form onSubmit={this.submitHandler}>
            <div className="chat-input">
              <div>
                <fieldset>
                  <legend>Message</legend>
                  <TextField
                    id="msg"
                    hintText="Send Message"
                    fullWidth={true}
                    value={this.state.msg}
                    onChange={this.changeHandler}
                    floatingLabelText="Floating Label Text"
                  />
                  <RaisedButton type="submit" label="Send" primary={true} />
                </fieldset>
              </div>
              {/* <div>{this.state.user}</div> */}
              {/* <div className="flex-spacer"></div>  */}
            </div>
          </form>
        </div>
      </div>
    )
  }
}