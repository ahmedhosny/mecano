import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Kernel.css';
/**
 * A kernel to indicate convolutions.
 */
export default class Kernel extends Component {
  /**
   * Returns two triangles and a dotted plane.
   * @return {ReactElement}
   */
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
Kernel.propTypes = {
  instance: PropTypes.object.isRequired,
};
