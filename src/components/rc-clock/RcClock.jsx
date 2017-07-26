require('./RcClock.scss')
import React from 'react';

export default class RcClock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()}
    }
    componentDidMount() {
        this.timerID = setInterval(()=> this.tick(), 1000);
    }
    componentWillUnmout() {
        clearInterval(this.timerID);
    }
    tick() {    
        this.setState({date: new Date()})
    }
    render() {
        return (
            <div>{this.state.date.toLocaleTimeString() }</div>    
        )
    }
}