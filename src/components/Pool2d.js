import React, { Component } from 'react';
import Outline from '../helpers/Outline';
import './Pool2d';

export default class Pool2d extends Component {
  render() {
    var coords = this.props.instance.coordinates;
    return (
      <g>
        <Outline radius={2} />
        <g filter="url(#outline)">
          {coords.map((m, index) => {
            return (
              <polygon
                className="polygon"
                points={m.join(' ')}
                key={'plane-' + index}
              />
            );
          })}
        </g>
      </g>
    );
  }
}
