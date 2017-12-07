import React, { Component } from 'react';
import "./Funnel.css"

export default class Funnel extends Component {
    render() {
        var coords = this.props.instance.coordinates
        return (
            <g>
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
            </g>
        );
    }
}


