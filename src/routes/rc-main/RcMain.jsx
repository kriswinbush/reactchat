import './RcMain.scss';
import React from 'react';
import RcAuth from '../../components/rc-auth/RcAuth.jsx';
import RcSplash from '../../components/rc-splash/RcSplash.jsx';
import {auth} from '../../service/firebase';
import AuthCheck from '../../hoc/AuthCheck.jsx';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import RcChat from '../../components/rc-chat/RcChat.jsx';
import RcClock from '../../components/rc-clock/RcClock.jsx';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import ActionHome from 'material-ui/svg-icons/action/home';
import RcSideLink from '../../components/rc-side-link/RcSideLink.jsx';
import RcContact from '../../components/rc-contact/RcContact.jsx';


let RcHandler = function(e){
    auth.signOut().then(
        this.props.history.push("/")
    )
}

class RcMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'React WebRTC Video Chat PWA',
            loading: true
        }
        /*since Main has the grid 
        makes since to pass down 
        its chldren position
        on the grid */
        this.gridStyle = {
            AppBar: {
                gridColumn: '1 / span 3',
                gridRow: '1 / span 1',
                height: 'inherit',
                marginTop:'-8px'
            }

        }
        this.flexStyle = {
            display: 'flex', 
            alignItems:'center',
            height:'100%',
            margin:'0'
        }
    }
    componentDidMount() {
        setTimeout(() => { 
            this.setState({loading: false})
        },1000)
    }
    rightIconComp() {
        return (
            <div style={this.flexStyle}>
                <IconButton
                    iconStyle={{color:'white'}}
                    iconClassName="material-icons"
                    tooltip="Ligature"
                 >home</IconButton>
            </div>
        )
    }
    handleTouchTap() {
        alert('yeahhh boiii~')
    }
    render() {  
        return (
            <main className="rc-main-container">
                <RcSideLink />
                <RcChat />
                <RcContact /> 
            </main>
        )
    }
} 
export default RcMain;
