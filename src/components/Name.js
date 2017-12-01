import React, { Component } from 'react';
import "./Name.css"

export default class Name extends Component {
    render() {
        const coords = this.props.instance.coordinates
        // const tagAnchors = this.props.instance.host.tagAnchors
        // const text1Height = 30
        // const text2Height = 17
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
                            </svg>
                        )
                    })
                }
               
            </svg>
        );
    }
}


 // {/*text: line1*/}
 //                <text 
 //                className="text1"
 //                textAnchor="middle"
 //                x={tagAnchors.bottom[0].X}
 //                y={tagAnchors.bottom[0].Y+text1Height}
 //                >
 //                    {this.props.instance.text1}
 //                </text>
 //                {/*text: line2*/}
 //                <text 
 //                className="text2"
 //                textAnchor="middle"
 //                x={tagAnchors.bottom[0].X}
 //                y={tagAnchors.bottom[0].Y+text1Height+text2Height}
 //                >
 //                    {this.props.instance.text2}
 //                </text>