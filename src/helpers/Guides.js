import React, { Component } from 'react';
import "./Guides.css"

export default class Construction extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <svg>
                <circle
                className="constructionOrigin"  
                r={this.props.radius} 
                cx={this.props.startX} 
                cy={this.props.startY}
                /> 

                <line 
                className="constructionLine"
                x1={this.props.startX} 
                y1={this.props.startY} 
                x2={this.props.startX+1500}  
                y2={this.props.startY} 
                />
            </svg>
        );
    }
}
