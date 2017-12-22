import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getGeometricMidpoint} from '../utils';
import './Bbox.css';
/**
 * Bounding box for mecano.
 */
export default class Bbox extends Component {
  /**
   * Returns a bounding rectangle and circle at the geometric midpoint.
   * @return {ReactElement}
   */
  render() {
    let bounds = this.props.bounds;
    let geometricMidpoint = getGeometricMidpoint(bounds);
    return (
      <g>
        <rect
          className="bboxRect"
          x={bounds.min.X}
          y={bounds.min.Y}
          width={bounds.max.X - bounds.min.X}
          height={bounds.max.Y - bounds.min.Y}
        />
        <circle
          className="mecanoGeometricMidPoint"
          r={15}
          cx={geometricMidpoint.X}
          cy={geometricMidpoint.Y}
        />
      </g>
    );
  }
}
Bbox.propTypes = {
  bounds: PropTypes.object.isRequired,
};
