import React, { Component } from 'react';
import "./Name.css"

export default class Name extends Component {
    render() {
        const coords = this.props.instance.coordinates
        return (
            <svg>
                {coords.map((m,index) => {
                    const gap = 10
                    return(
                            <svg
                            key={"name"+index}
                            >
                                {/*line*/}
                                <line
                                className="nameLine"
                                x1={m.X1} 
                                y1={m.Y1} 
                                x2={m.X2}  
                                y2={m.Y2}
                                />
                                {/*circle*/}
                                <circle
                                className="nameCircle"  
                                r={4} 
                                cx={m.X1} 
                                cy={m.Y1}
                                />
                                {/*text: line1*/}
                                <text 
                                className="nameText1"
                                textAnchor="middle"
                                x={m.X2}
                                y={m.Y2-gap}                                
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

// https://stackoverflow.com/questions/39191054/how-to-compensate-translate-when-skewx-and-skewy-are-used-on-svg
// transform="skewY(25) translate(0, 50)"
// https://www.sarasoueidan.com/blog/svg-transformations/