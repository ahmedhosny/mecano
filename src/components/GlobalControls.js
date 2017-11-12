import React, { Component } from 'react';


export default class GlobalControls extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        
        return (
            <div>
            angle 
                <input 
                value={this.props.angle} 
                onChange={this.props.onChangeAngle} 
                />
            offset X 
                <input 
                value={this.props.offset.X} 
                onChange={this.props.onChangeOffset} 
                />
            show construction 
                <input 
                type="checkbox"
                checked={this.props.construction}
                onChange={this.props.onChangeConstruction} 
                />
            </div>
        );
    }
}


