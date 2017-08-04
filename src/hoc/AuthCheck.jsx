import React, {Component} from 'react';
import { Route, Link, Redirect, withRouter } from 'react-router-dom';
import fb from '../service/firebase';
import stores from '../stores';
const AuthCheck = function({ component: Component, ...rest}) { 
  return (
    <Route {...rest}  render={ props =>{  
      props =  {...props, ...rest}
      console.log(stores.userStore);
      let authedUser = null;
      fb.auth.onAuthStateChanged((user)=>{
        if(user) {

        }  
      }) 
      console.log(stores.authStore)
      return (
        fb.auth.currentUser ? (
          <Component {...props}/>
        ):(
          <Redirect to={{
            pathname: '/auth',
            state: { from: props.location }
          }}/>
        )
      )
    }}/>
  ) 
}
export default AuthCheck;

const NotherTag = ({component:Component, ...rest}) => {
  return class NT extends Component {
    constructor(props){
      super(props);

    }
    render() {
      let content = <div>yeah</div>
      return (content)
    }
  }
}