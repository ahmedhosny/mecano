import React, { Component } from 'react';

export default class Outline extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <filter id="outline">
                <feMorphology operator="dilate" in="SourceAlpha" radius={this.props.radius}/>
                <feComposite in="SourceGraphic"/>
            </filter>
        );
    }
}

