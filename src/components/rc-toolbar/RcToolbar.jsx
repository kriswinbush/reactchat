import './RcToolbar.scss';
import React, { Component } from 'react';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import {pinkA200, blue500, transparent} from 'material-ui/styles/colors';
import IconMenu from 'material-ui/IconMenu';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import NavigationMenuIcon from 'material-ui/svg-icons/navigation/menu';
import {inject, observer} from 'mobx-react';

@inject('stores') @observer
export default class RcToolbar extends Component {
  constructor(props) {
    super(props);
    this.state = { ddValue: 1};

    this.dropDownHandler = this.dropDownHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }
  dropDownHandler(event, index, value) {
    switch(value) {
      case 1: 
        this.props.stores.uiStore.toggleSideContainer();
      break;
      case 2:
      break;
      case 3:
      break;
      case 4:
      break;
      case 5:
      break;
      case 6:
      break;
      case 7:
      break;
      case 8:
      this.props.stores.authStore.signOut();
      break;
      default:
      break;
    }
    this.setState({ddValue: value})
  }

  clickHandler(evt) {
    this.props.stores.uiStore.toggleSideContainer();
  }
  render() {
    const iconStyles = { marginRight: 24 };
    return (
      <div className="rc-toolbar-container">
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            <ToolbarTitle text="Rx Chat" />
          </ToolbarGroup>  
          <ToolbarGroup>
            <DropDownMenu value={this.state.ddValue} onChange={this.dropDownHandler}>
              <MenuItem value={1} primaryText="Open Contacts" />
              <MenuItem value={2} primaryText="Open File" />
              <MenuItem value={3} primaryText="Open Folder" />
              <MenuItem value={4} primaryText="Save" />
              <MenuItem value={5} primaryText="Save As..." />
              <MenuItem value={6} primaryText="Preferences" />
              <MenuItem value={7} primaryText="Close Window" />
              <MenuItem value={8} primaryText="Sign Out" />
            </DropDownMenu>
          </ToolbarGroup>
        </Toolbar>
      </div>
    )
  }
}
