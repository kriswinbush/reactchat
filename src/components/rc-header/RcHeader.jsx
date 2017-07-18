import React from 'react'
require('./RcHeader.scss');
export default class RcHeader extends React.Component {

    render() {
        return (
            <div className='header-container'>
                <header>
                    <h3>{this.props.headerTitle}</h3>
                    <div className="flex-spacer"></div>
                    {this.props.children}

                </header>
            </div>
        )
    }
}