import'./RcSplash.scss';
import React from 'react';
import { Route, Link, Redirect, withRouter } from 'react-router-dom'
import {auth, fire} from '../../service/firebase';
import RcAuth from '../../components/rc-auth/RcAuth.jsx';
import RcClock from '../../components/rc-clock/RcClock.jsx';
class RcSplash extends React.Component {
    constructor(props) {
        super(props);
        this.auth = auth;
        this.state = {
            loading: true
        }
    }
    componentDidMount() {
        if(!this.auth.currentUser) setTimeout(() => this.setState({loading: false}),3000);
    }
    render() {
        let content = this.state.loading ? (
            <div className="rc-center-image">
                <img src='https://placeimg.com/640/480/any' />
            </div>
        ) : (
            <div>
                {/* <AuthCheck component={RcHome} path='/' blah="Blah Blah Blah..." thot="Jill" duh="simpson" /> */}
                {/* <button><Link to="/login">login</Link></button> */}
            </div> 
        );

        return ( 
            <div className="rc-splash-container">
                {content}
                 <Route path="/login" component={RcAuth} /> 
            </div>
        )
    }
}
export default withRouter(RcSplash);
