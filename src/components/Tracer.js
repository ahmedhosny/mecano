import React, { Component } from 'react';
import "./Tracer.css"

export default class Tracer extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //     };
    // }

    render() {
        var coords = this.props.instance.coordinates
        return (
            <svg>
                {coords.map((m,index) => {
                    return(
                        <g
                        key={"group-"+index}
                        >
                            <line 
                            className="tracerLine"
                            x1={m.X1} 
                            y1={m.Y1} 
                            x2={m.X2}  
                            y2={m.Y2} 
                            />
                        </g>
                        )
                    })
                }
            </svg>
        );
    }
}

