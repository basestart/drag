import React, { Component } from 'react';

export default class Drag extends Component {
    componentDidMount () {
        this.sendCenter();
    }
    handleOver(e) {
        console.log(e);
    }
    sendCenter () {
        let {sendCenter, id} = this.props;
        let {tar} = this.refs;
        let {offsetLeft, offsetTop, offsetWidth, offsetHeight} = tar;
        let center = [offsetLeft + offsetWidth / 2, offsetTop + offsetHeight / 2];
        // debugger;
        sendCenter(id, center);
        console.log(tar)
    }
    render () {
        return <div 
                ref="tar"
                onMouseOver={this.handleOver.bind(this)}
            style={{height:"200px", width: "200px", border: "1px solid red",  borderRadius: "100px"}}
        ></div>
    }
}