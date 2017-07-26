import'./RcSplash.scss';
import React from 'react';
import { Route, Link, Redirect, withRouter } from 'react-router-dom'
import fire from '../rc-firebase/RcFirebase.js';
import RcAuth from '../../components/rc-auth/RcAuth.jsx';
import RcClock from '../../components/rc-clock/RcClock.jsx';
class RcSplash extends React.Component {
    constructor(props) {
        super(props);
        this.auth = fire.auth();
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
                <img src='http://loremflickr.com/320/240/' />
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
