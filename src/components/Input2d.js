import React, { Component } from 'react';
import "./Input2d.css"

export default class Input2d extends Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        return (
            <svg>
                <polygon 
                points={this.props.instance.coordinates.join(" ")}
                fill="white" 
                stroke="black" 
                strokeWidth="3"
                strokeLinejoin="bevel"
                />
            </svg>
        );
    }
}


