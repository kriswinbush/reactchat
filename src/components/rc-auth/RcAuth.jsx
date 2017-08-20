import './RcAuth.scss';
import React from 'react';
import fb from '../../service/firebase';
import { withRouter } from 'react-router-dom';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { inject, Provider, observer } from 'mobx-react';

@inject('stores') @observer
export default class RcAuth extends React.Component {
  constructor(props) {
    super(props);
    this.auth = this.props.stores.authStore;
    this.state = {
      email: 'kris.winbush@gmail.com',
      password: 'password'
    }
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }
  changeHandler(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.id;
    this.setState({ [name]: value })
  }
  submitHandler(event) {
    event.preventDefault();
    switch(event.target.id) {
      case 'login':
        this.auth.loginUser(this.state.email, this.state.password)
          .then(() => this.props.stores.routing.push("/"));
      break;
      case 'signup':
        this.auth.createUser(this.state.email, this.state.password)
      break;
      case 'anon':
      break;
      case 'logout':
        this.auth.signOut()
      break;
    }
  }

  render() {
    return (
      <div className="rc-auth-container">
        <div className="rc-form-container">
          <Card>
            <CardMedia
              overlay={<CardTitle title="Sign in" subtitle="Login to your account or Sign up with email and password" />}
            >
              <img src="https://placeimg.com/640/240/any" alt="" />
            </CardMedia>
            <CardText>{this.auth.errorMessage}</CardText>
            <CardActions>
              <TextField
                id="email"
                hintText="Email"
                floatingLabelText="Enter your email"
                fullWidth={true}
                value={this.state.email}
                onChange={this.changeHandler}
                type="text"
              />
              <TextField
                id="password"
                hintText="Password"
                floatingLabelText="Enter your password"
                fullWidth={true}
                value={this.state.password}
                onChange={this.changeHandler}
              />
            </CardActions>
            <CardActions>
              <button id="login" onClick={this.submitHandler}>Sign In</button>
              <button id="signup" onClick={this.submitHandler}>Sign Up</button>
              <button id="anon" onClick={this.submitHandler}>Anonymous</button>
              <button id="logout" onClick={this.submitHandler}>log Out</button>
            </CardActions>
          </Card>
        </div>
      </div> 
    )
  }
}