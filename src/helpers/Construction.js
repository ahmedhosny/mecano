import React, { Component } from 'react';
import "./Construction.css"

export default class Construction extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        var instance = this.props.instance
        return (
            <svg>
                {instance.in ?
                    <circle
                    className="constructionCircleIn"  
                    r={this.props.radius} 
                    cx={instance.in.X} 
                    cy={instance.in.Y}
                    /> : null
                }
                {instance.bounds ?
                    
                    <rect 
                    className="constructionRect"
                    x={instance.bounds.min.X} 
                    y={instance.bounds.min.Y} 
                    width={instance.bounds.max.X - instance.bounds.min.X}  
                    height={instance.bounds.max.Y - instance.bounds.min.Y} 
                    /> : null
                }
                {instance.out.map((m,index) => {
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