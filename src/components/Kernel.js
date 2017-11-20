import React, { Component } from 'react';
import './Kernel.css'

export default class Kernel extends Component {
    render() {
        var coords = this.props.instance.coordinates
        return (
            <svg>
                {coords.map((m,index) => {
                        return(
                            <g
                            key={"kernel-"+index}
                            >
                                <polygon 
                                className="kernelTriangle"
                                points={m[0].join(" ")}
                                /> 
                                <polygon 
                                className="kernelTriangle"
                                points={m[1].join(" ")}
                                /> 
                                <polyline
                                className="kernelHidden"
                                strokeDasharray="5"
                                points={m[2].join(" ")}
                                /> 
                            </g>
                        )
                    }   
                )}
            </svg>
        );
    }
}



