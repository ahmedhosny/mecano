import React, { Component } from 'react';
import Outline from '../helpers/Outline'

export default class Pool2d extends Component {
    // constructor(props) {
    //     super(props);
    // }
    // 
   render() {
        var coords = this.props.instance.coordinates
        return (
            <svg>
                <Outline
                radius={2}
                />
                <g 
                filter="url(#outline)"
                >
                    {coords.map((m,index) => {
                        return(
                                <polygon 
                                points={m.join(" ")}
                                fill="white" 
                                stroke="black" 
                                strokeWidth="2"
                                strokeLinejoin="bevel"
                                key={"plane-"+index}
                                />
                            )
                        })
                    }
                </g>
            </svg>
        );
    }
}
