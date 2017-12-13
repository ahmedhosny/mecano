import React, { Component } from 'react';
import { withTheme } from 'material-ui/styles';
import {range} from 'lodash';

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
                    key={"grid-" + indexX + '-' + indexY}
                    />  
                )
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