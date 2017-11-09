import React, { Component } from 'react';
import Construction from './Construction';
import {getTranslation,range} from './Utils.js'

export default class Kernel extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.getCoordinates = this.getCoordinates.bind(this);
    }

    // two triangles
    getCoordinates(){
        //
        var p1x = this.props.inX  
        var p1y = this.props.inY 
        var p2x = p1x  
        var p2y = this.props.inY - this.props.sizeY
        //
        var p3x = p2x +  parseInt( Math.cos(this.props.angle* 0.0174533) * this.props.sizeX )
        var p3y = p2y - parseInt( Math.sin(this.props.angle* 0.0174533) * this.props.sizeX )
        var p4x = this.props.outX
        var p4y = this.props.outY
        //
        return [[p1x , p1y , p2x , p2y , p4x , p4y], [p2x , p2y , p3x , p3y , p4x , p4y] , [p1x , p1y , p2x , p2y , p3x , p3y]]
    };
    

    render() {
        var translation = getTranslation([this.getCoordinates()[2]],this.props.inX,this.props.inY);
        //
        var triangle1 = this.getCoordinates()[0];
        triangle1[4] -= translation[0];
        triangle1[5] -= translation[1];
        //
        var triangle2 = this.getCoordinates()[1];
        triangle2[4] -= translation[0];
        triangle2[5] -= translation[1];
        //
        return (
            <svg>
                <g 
                transform={"translate(" + translation[0] + "," + translation[1] + ")"} 
                > 
                    <polygon 
                    points={triangle1.join(" ")}
                    fill="white" 
                    stroke="black" 
                    strokeWidth="1"
                    strokeLinejoin="bevel"
                    />
                    <polygon 
                    points={triangle2.join(" ")}
                    fill="white" 
                    stroke="black" 
                    strokeWidth="1"
                    strokeLinejoin="bevel"
                    />
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



