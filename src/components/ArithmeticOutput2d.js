import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './ArithmeticInput2d.css';
/**
 * A plane.
 */
export default class Input2d extends Component {
  /**
   * Returns a single Polygon.
   * @return {ReactElement}
   */
  render() {
    return (
      <g>
        {this.props.instance.gridCoordinates.map((m, index) => {
          return (
            <polygon
              className="polygonGrid"
              points={m.join(' ')}
              key={'grid-' + index}
            />
          );
        })}
        <polygon
          className="polygon"
          points={this.props.instance.coordinates.join(' ')}
        />
      </g>
    );
  }
}
Input2d.propTypes = {
  instance: PropTypes.object.isRequired,
};
