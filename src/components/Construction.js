import React, { Component } from 'react';
import "./Construction.css"

export default class Construction extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        var entity = this.props.entity
        var bounds = entity.bounds
        return (
            <svg>
                <circle
                className="constructionCircleIn"  
                r={this.props.radius} 
                cx={entity.in.X} 
                cy={entity.in.Y}
                /> 
                 <rect 
                className="constructionRect"
                x={bounds.min.X} 
                y={bounds.min.Y} 
                width={bounds.max.X - bounds.min.X}  
                height={bounds.max.Y - bounds.min.Y} 
                />
                {entity.out.map((m,index) => {
                    return (
                            <circle
                            className="constructionCircleOut"  
                            r={this.props.radius*1.5} 
                            cx={m.X} 
                            cy={m.Y}
                            key={"out-"+index+"-"+m.key}
                            /> 
                        )
                    })
                }
            </svg>
        );
    }
}