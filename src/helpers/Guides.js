import React, { Component } from 'react';
import "./Guides.css"

export default class Construction extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        var props = this.props
        return (
            <g>
                <circle
                className="guideOrigin"  
                r={props.radius} 
                cx={props.startX} 
                cy={props.startY}
                /> 
                <line 
                className="guideLine"
                x1={props.startX} 
                y1={props.startY} 
                x2={props.bounds.max.X}  
                y2={props.startY} 
                />
                <rect 
                className="guideRect"
                x={props.bounds.min.X} 
                y={props.bounds.min.Y} 
                width={props.bounds.max.X - props.bounds.min.X}  
                height={props.bounds.max.Y - props.bounds.min.Y} 
                />
            </g>
        );
    }
}


