import React, { Component } from 'react';
import {getGeometricMidpoint} from '../classes/utils'
import "./Bbox.css"

export default class Bbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        var props = this.props
        var geometricMidpoint = getGeometricMidpoint(props.bounds)
        return (
            <g>
                <rect 
                className="bboxRect"
                x={props.bounds.min.X} 
                y={props.bounds.min.Y} 
                width={props.bounds.max.X - props.bounds.min.X}  
                height={props.bounds.max.Y - props.bounds.min.Y} 
                />
                <circle
                className="mecanoGeometricMidPoint"
                r={15} 
                cx={geometricMidpoint.X} 
                cy={geometricMidpoint.Y}
                />  
            </g>
        );
    }
}


