import React from 'react';

export default class RcVideo extends React.Component {
    render() {
        return (
            <div className="rc-video-container">
                <video src={this.props.feed}>
                    {this.props.children}
                </video>
            </div>
        )
    }
}