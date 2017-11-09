import React, { Component } from 'react';
import _ from 'lodash';
import Kernel from './Kernel'
import Construction from './Construction';
import Outline from './Outline'
import {getTranslation,range,getRectangleCoordinates} from './Utils.js'

export default class Convolution extends Component {
    constructor(props) {
        super(props);
        this.state = {
            duplicateOffset: 15,
            frequency: 10
        };
    }

    render() {
        var polygons = [],
            coordinates = [];
        var count = Math.floor(this.props.maps/this.state.frequency)+2
        for (var i = 0 ; i < count ; i++){
            // append all points to coordinates
            // x,y,x,y,x,y....
            coordinates.push(getRectangleCoordinates(this,i))
            // skip two
            // add circles and continue
            if (i==count-2 | i==count-3 ){
                polygons.push(
                    <circle
                    r="1" 
                    cx={getRectangleCoordinates(this,i)[0]} 
                    cy={getRectangleCoordinates(this,i)[1]}
                    key={i}
                    />
                )
                continue;
            }
            polygons.push(
                <polygon 
                points={getRectangleCoordinates(this,i).join(" ")}
                fill="white" 
                stroke="black" 
                strokeWidth="2"
                key={i}
                strokeLinejoin="bevel"
                />
            )
        }
        var translation = getTranslation(coordinates,this.props.inX,this.props.inY);
        return (
            <svg>
                <Outline
                radius={1}
                />
                <g 
                filter="url(#outline)"
                transform={"translate(" + translation[0] + "," + translation[1] + ")"} 
                > 
                {polygons}
                </g>
                {this.props.structureVisible ?
                    <Construction
                    inX={this.props.inX}
                    inY={this.props.inY}
                    outX={this.props.outX}
                    outY={this.props.outY}
                    radius={5}
                    /> : null
                }
            </svg>
        );
    }
}
