import React, { Component } from 'react';
import "./Input2d.css"

export default class Input2d extends Component {
    render() {
        return (
        	<g
        	fill={'#ff0000'}
        	>
	            <polygon 
	            className="polygon"
	            points={this.props.instance.coordinates.join(" ")}
	            />
	        </g>
        );
    }
}


