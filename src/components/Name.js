import React, { Component } from 'react';
import "./Name.css"

export default class Name extends Component {
    render() {
        const coords = this.props.instance.coordinates
        return (
            <svg>
                {coords.map((m,index) => {
                    return(
                            <svg
                            key={"name"+index}
                            >
                                {/*line*/}
                                <line
                                className="nameline"
                                x1={m.X1} 
                                y1={m.Y1} 
                                x2={m.X2}  
                                y2={m.Y2}
                                />
                                {/*circle*/}
                                <circle
                                className="nameCircle"  
                                r={5} 
                                cx={m.X1} 
                                cy={m.Y1}
                                />
                                {/*text: line1*/}
                                <text 
                                className="text1"
                                textAnchor="middle"
                                x={m.X1}
                                y={m.X2}
                                >
                                    {this.props.instance.text1}
                                </text>
                            </svg>
                        )
                    })
                }
               
            </svg>
        );
    }
}
