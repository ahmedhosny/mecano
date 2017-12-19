import React, {Component} from 'react';
import './Kernel.css';

export default class Kernel extends Component {
  render() {
    let coords = this.props.instance.coordinates;
    return (
      <g>
        {coords.map((m, index) => {
          return (
            <g key={'kernel-' + index}>
              {/* triangle1*/}
              <polygon className="kernelTriangle" points={m[0].join(' ')} />
              {/* triangle2*/}
              <polygon className="kernelTriangle" points={m[1].join(' ')} />
              {/* dotted base*/}
              <polyline
                className="kernelHidden"
                strokeDasharray="5"
                points={m[2].join(' ')}
              />
            </g>
          );
        })}
      </g>
    );
  }
}
