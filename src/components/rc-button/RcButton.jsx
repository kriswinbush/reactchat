import React from 'react';
require('./RcButton.scss');

export default class RcButton extends React.Component {
    render() { 
        return (
             <div className='rc-button-container'>{this.props.bName}</div>
        )
    }
}