import React from 'react';
import { Route, Link, Redirect, withRouter } from 'react-router-dom';
import fb from '../service/firebase';

const AuthCheck = function({ component: Component, ...rest}) { 
  return (
    <Route {...rest}  render={ props => {  
      props =  {...props, ...rest}
      let content = null;
      fb.auth.onAuthStateChanged((user)=>{
        if(user) {}  
      }) 
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