import React, { Component } from 'react';

export default class Image extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
           <input value={this.state.sizeX1} onChange={this.onChildUpdate} />
        );
    }
}



