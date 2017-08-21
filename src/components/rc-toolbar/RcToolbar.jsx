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
export default class RcToolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ddValue: 1
    }
    this.handleChange = this.handleChange.bind(this);

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
      <div className="rc-toolbar-container">
        <Toolbar> 
          <ToolbarGroup>
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
          <ToolbarGroup firstChild={true}>
            <ToolbarTitle text="Rx Chat" />
          </ToolbarGroup> 
          <ToolbarGroup>
            <ToolbarSeparator />
            <IconMenu iconButtonElement={
                <IconButton touch={true}>
                  <NavigationMenuIcon />
                </IconButton>}>
              <MenuItem primaryText="Download" />
              <MenuItem primaryText="More Info" />
            </IconMenu>
          </ToolbarGroup>
        </Toolbar>
      </div>
    )
  }
}
