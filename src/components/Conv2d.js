import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Outline from '../helpers/Outline';
import './Conv2d.css';

/**
 * A plane stack.
 */
export default class Conv2d extends Component {
  /**
   * Draws a plane stack with an outline.
   * @return {ReactElement} Polygons, each with four coordinates.
   */
  render() {
    let coords = this.props.instance.coordinates;
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

Conv2d.propTypes = {
  instance: PropTypes.object.isRequired,
};
