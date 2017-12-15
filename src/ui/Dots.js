import React, { Component } from 'react';
import { withTheme } from 'material-ui/styles';
import {range} from 'lodash';
import './Dots.css'

class Dots extends Component {
    render() {
        const { theme } = this.props;
        var dots = []
        range(this.props.grid.X,this.props.canvas.X,this.props.grid.X).forEach((x,indexX) => {
            range(this.props.grid.Y,this.props.canvas.Y,this.props.grid.Y).forEach((y,indexY) => {
                dots.push(
                    <circle
                    fill={theme.palette.primary['800']}  
                    r={3} 
                    cx={x} 
                    cy={y}
                    key={"dot" + indexX + '-' + indexY}
                    /> 
                )
                if (this.props.construction){
                    dots.push(
                        <line 
                        className="constructionGrid"
                        x1={x-this.props.grid.X/2} 
                        y1={0} 
                        x2={x-this.props.grid.X/2}  
                        y2={this.props.canvas.Y}
                        key={"line-v" + indexX + '-' + indexY}
                        />
                    )
                    dots.push(
                        <line 
                        className="constructionGrid"
                        x1={0} 
                        y1={y-this.props.grid.Y/2} 
                        x2={this.props.canvas.X}  
                        y2={y-this.props.grid.Y/2}
                        key={"line-h" + indexX + '-' + indexY}
                        />
                    )
                }
            });
        });
        return (
            <g>
            {dots}
            </g>
        )
    }
}
export default withTheme()(Dots);