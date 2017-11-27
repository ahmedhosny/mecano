import React, { Component } from 'react';
import "./Input2d.css"

export default class Input2d extends Component {
    render() {
        return (
            <svg>
                <polygon 
                className="polygon"
                points={this.props.instance.coordinates.join(" ")}
                />
            </svg>
        );
    }
}


