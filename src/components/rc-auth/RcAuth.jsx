require('./RcAuth.scss')
import React from 'react';
import fire from '../rc-firebase/RcFirebase.js';
import { withRouter } from 'react-router-dom';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';



export default class RcAuth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'kris.winbush@gmail.com',
            password:'password',
            errorMessage:''
        }
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.auth = fire.auth();
    }
    inputChangeHandler(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
    }
    submitHandler(e) {
        console.log(e.target.id)
        if(e.target.id === 'signup') {
            this.auth.createUserWithEmailAndPassword(this.state.email, this.state.password);
        }
        if(e.target.id === 'logout') {
            this.auth.signOut()
        }
        this.auth.signInWithEmailAndPassword(this.state.email, this.state.password)
            .catch(err =>{
                console.log(err.code)
                
                if(err.code === "auth/invalid-email") {
                  this.setState({errorMessage:"Invalid email fix the issue"})
                }
                if(err.code === "auth/user-not-found") {
                     this.setState({errorMessage:"user not found, click sign up to continue"})
                    // disable login button disable logout button, enable signup button css
                }
            });

        this.auth.onAuthStateChanged(user => {
            if(user) {
                this.props.history.push("/")
            }

        })
        e.preventDefault(); 
    }
    render() {
        return (
            <div className="rc-auth-container"> 
                <div className="rc-form-container">
                    <Card>
                        <CardMedia
                            overlay={<CardTitle title="Sign in" subtitle="Login to your account or Sign up with email and password" />}
                        >
                            <img src="http://lorempixel.com/400/200" alt="" />
                        </CardMedia>
                        <CardText>{this.state.errorMessage}</CardText> 
                        <CardActions>
                            <TextField
                                id="rc-login-email" 
                                hintText="Email"
                                floatingLabelText="Enter your email"
                                fullWidth={true}
                                value={this.state.email} 
                                onChange={this.inputChangeHandler}
                                type="text"
                            />
                            <TextField 
                                id="rc-login-password"
                                hintText="Password"
                                floatingLabelText="Enter your password"
                                fullWidth={true}
                                value={this.state.password} 
                                onChange={this.inputChangeHandler}
                            />
                        </CardActions>
                        <CardActions>
                        <FlatButton id="login" label="Sign In" onClick={this.submitHandler} />
                        <FlatButton id="signup" label="Sign Up" onClick={this.submitHandler} />
                        <FlatButton id="logout" label="Log Out" onClick={this.submitHandler} />
                        </CardActions>
                    </Card>          
                </div>
            </div>
            
        )
        console.log(this.state)
    }
}