import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Shape.css';
/**
 * Shape tag below primative.
 */
export default class Shape extends Component {
  /**
   * Returns a horizontal line with two lines of text.
   * @return {ReactElement}
   */
  render() {
    const coords = this.props.instance.coordinates;
    const position = this.props.instance.position;
    const text1Height = 30;
    const text2Height = 20;
    return (
      <g>
        {/* line*/}
        {coords.map((m, index) => {
          return (
            <line
              className="line"
              x1={m.X1}
              y1={m.Y1}
              x2={m.X2}
              y2={m.Y2}
              key={'group-' + index}
            />
          );
        })}
        {/* text: line1*/}
        <text
          className="shapeText1"
          textAnchor="middle"
          x={position.X}
          y={position.Y + text1Height}
        >
          {this.props.instance.text1}
        </text>
        {/* text: line2*/}
        <text
          className="shapeText2"
          textAnchor="middle"
          x={position.X}
          y={position.Y + text1Height + text2Height}
        >
          {this.props.instance.text2}
        </text>
      </g>
    );
  }
}
Shape.propTypes = {
  instance: PropTypes.object.isRequired,
};
