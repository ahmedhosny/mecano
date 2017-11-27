import React, { Component } from 'react';

export default class Outline extends Component {
    render() {
        return (
            <filter id="outline">
                <feMorphology operator="dilate" in="SourceAlpha" radius={this.props.radius}/>
                <feComposite in="SourceGraphic"/>
            </filter>
        );
    }
}

