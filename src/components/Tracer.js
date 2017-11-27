import React, { Component } from 'react';
import "./Tracer.css"

export default class Tracer extends Component {
    render() {
        var coords = this.props.instance.coordinates
        return (
            <svg>
                {coords.map((m,index) => {
                    return(
                            <line 
                            className="tracerLine"
                            x1={m.X1} 
                            y1={m.Y1} 
                            x2={m.X2}  
                            y2={m.Y2}
                            key={"group-"+index}
                            />
                        )
                    })
                }
            </svg>
        );
    }
}


