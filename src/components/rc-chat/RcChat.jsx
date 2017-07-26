require('./RcChat.scss')
import React, {Component} from 'react';
import fire from '../rc-firebase/RcFirebase.js'
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Link,withRouter} from 'react-router-dom';
import {pinkA200, blue500, transparent} from 'material-ui/styles/colors';
import RcChatContent from '../rc-chat-content/RcChatContent.jsx';
import RcCallGroup from '../rc-call-group/RcCallGroup.jsx';

export default class RcChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            speed: 10,
            ddValue: 1
        }
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        const rootRef = fire.database().ref();
        
        var d = rootRef.child('reactchat');

        var i = rootRef.child('reactchat/users')
        i.push().set({id: 2, firstName: 'Kris', LastName: "WInbush", email:'Kris.winbush@gmail.com'})
        i.push().set({id: 1, firstName: 'Kris', LastName: "WInbush", email:'ks.nbush@gmail.com'})           
        const speedRef = d.child('speed');

        speedRef.on('value', snap => {
            this.setState({
                speed: snap.val()
            })
        })
    }
    handleChange(event, index, value) {
        console.log(event)
        this.setState({ddValue: value})
    }
    render() {
        const iconStyles = {
            marginRight: 24,
        };
        return (
            <div className="rc-chat-container">
                <Toolbar>
                    <ToolbarGroup firstChild={true}>
                        <DropDownMenu value={this.state.ddValue} onChange={this.handleChange}>
                            <MenuItem value={1} primaryText="New File" />
                            <MenuItem value={2} primaryText="Open File" />
                            <MenuItem value={3} primaryText="Open Folder" />
                            <MenuItem value={4} primaryText="Save" />
                            <MenuItem value={5} primaryText="Save As..." />
                            <MenuItem value={6} primaryText="Preferences" />
                            <MenuItem value={7} primaryText="Close Window" />
                            <MenuItem value={8} primaryText="Exit" />
                        </DropDownMenu>
                    </ToolbarGroup>
                    <ToolbarGroup>
                    <ToolbarTitle text="Options" />
                    <FontIcon className="muidocs-icon-custom-sort" />
                    <FontIcon className="material-icons" style={iconStyles} color={blue500}>videogame_asset</FontIcon>
                    <ToolbarSeparator />
                    <RaisedButton label="Create Broadcast" primary={true} />
                    <IconMenu
                        iconButtonElement={
                        <IconButton touch={true}>
                            <NavigationExpandMoreIcon />
                        </IconButton>
                        }
                    >
                        <MenuItem primaryText="Download" />
                        <MenuItem primaryText="More Info" />
                    </IconMenu>
                    </ToolbarGroup>
                </Toolbar>
                <RcCallGroup />
                <RcChatContent />
                <h1>{this.state.speed}</h1>
            </div>
        )
    }
}
const RcHome = withRouter((props) => {
    console.log(props)
    return (
        <div className='rc-main-container'>
            <h1>Damn final made it home</h1>
            <RaisedButton label="Sign Out" primary={true} onClick={() => fire.auth().signOut().then(() => props.history.push('/')) } />
            <RaisedButton label="Sign Out" primary={true} onClick={() => props.history.push('/')} />
        </div>
    )
})