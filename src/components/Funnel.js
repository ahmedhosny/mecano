import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Funnel.css';

/**
 * Funnel component that is used to show upsampling or downsmampling.
 */
export default class Funnel extends Component {
  /**
   * Draws three lines.
   * @return {ReactElement} Draws three lines.
   */
  render() {
    let coords = this.props.instance.coordinates;
    return (
      <g>
        {coords.map((m, index) => {
          return (
            <line
              className="tracerLine"
              x1={m.X1}
              y1={m.Y1}
              x2={m.X2}
              y2={m.Y2}
              key={'group-' + index}
            />
          );
        })}
      </g>
    );
  }
}

Funnel.propTypes = {
  instance: PropTypes.object.isRequired,
};
