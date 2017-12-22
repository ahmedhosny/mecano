import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Outline from '../helpers/Outline';
import './Pool2d';
/**
 * Pool2d component.
 */
export default class Pool2d extends Component {
  /**
   * Returns a PlaneStack with an outline.
   * @return {ReactElement}
   */
  render() {
    let coords = this.props.instance.coordinates;
    return (
      <g>
        <Outline />
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
Pool2d.propTypes = {
  instance: PropTypes.object.isRequired,
};
