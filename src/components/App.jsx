require('./App.scss');

import React from 'react';
import RcButton from '../components/rc-button/RcButton.jsx';
import RcHeader from '../components/rc-header/RcHeader.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import ActionHome from 'material-ui/svg-icons/action/home';
import IconButton from 'material-ui/IconButton';
export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            tick: new Date().toLocaleTimeString(),
            title: "React WebRTC Video Chat PWA"
        }
        this.gridStyle = {
            gridColumn: '1 / span 3',
            gridRow: '1 / span 1',
            height: 'inherit',
            marginTop:'-8px'
        }
    }
    componentWillMount() {
       // alert('will mount called');
    }
    handleTouchTap() {
        alert('yeahhh boiii~')
    }
    rightIconComp() {
        return (
            <div style={{display: 'flex', alignItems:'center',height:'100%',margin:'0' }}>
                <IconButton
                    iconStyle={{color:'white'}}
                    iconClassName="material-icons"
                    tooltip="Ligature"
                 >home</IconButton>
            </div>
        )
    }
    render() {
       
        return (
            <MuiThemeProvider>
                <div className="app">
                    <AppBar 
                        style={this.gridStyle} 
                        title={this.state.title} 
                        //iconClassNameRight="muidocs-icon-navigation-expand-more"
                        iconElementRight={this.rightIconComp()} 
                        //iconElementRight={<FlatButton label="Save" />}    
                    />
                    <div>{new Date().toLocaleTimeString() }</div>
                    <h1>this is cool too and more</h1>
                    <FontIcon className="material-icons">home</FontIcon>
                </div>
            </MuiThemeProvider>
        )
    }
}