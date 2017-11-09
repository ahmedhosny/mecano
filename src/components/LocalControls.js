import React, { Component } from 'react';

export default class LocalControls extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }
    render() { 
        return (
            <div>
            x size 
                <input 
                value={this.props.value}
                name={this.props.name}  
                onChange={this.props.onChange} 
                />
            </div>
        );
    }
}



