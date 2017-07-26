import React from 'react';
import { Route, Link, Redirect, withRouter } from 'react-router-dom';
import fire from '../components/rc-firebase/RcFirebase.js';

const AuthCheck = function({ component: Component, ...rest}) { 
    return (
        <Route {...rest}  render={ props => {  
            console.log(rest);
            props =  {...props, ...rest}
            console.log(props)
            console.log(fire.auth().currentUser)
            let content = null;
            fire.auth().onAuthStateChanged((user)=>{
                console.log(user)
                if(user) {
                //turn into class constructor
                }
                 
            })

            return (
                fire.auth().currentUser ? (
                    <Component {...props}/>
                ) : (
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