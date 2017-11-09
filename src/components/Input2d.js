import React, { Component } from 'react';
import {getRectangleCoordinates} from './DrawUtils.js'
import Mapping from '../Mapping'

export default class Input2d extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <svg>
                <polygon 
                points={getRectangleCoordinates(this.props.entity,Mapping.Input2d.duplicate,this.props.angle).join(" ")}
                fill="white" 
                stroke="black" 
                strokeWidth="3"
                strokeLinejoin="bevel"
                />
            </svg>
        );
    }
}


