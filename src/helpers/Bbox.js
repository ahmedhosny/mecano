import React, { Component } from 'react';
import "./Bbox.css"

export default class Bbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        var props = this.props
        return (
            <g>
                <rect 
                className="bboxRect"
                x={props.bounds.min.X} 
                y={props.bounds.min.Y} 
                width={props.bounds.max.X - props.bounds.min.X}  
                height={props.bounds.max.Y - props.bounds.min.Y} 
                />
            </g>
        );
    }
}


