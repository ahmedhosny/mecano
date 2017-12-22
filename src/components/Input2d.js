import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Input2d.css';
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
      <g fill={'#ff0000'}>
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
