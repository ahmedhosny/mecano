import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withTheme} from 'material-ui/styles';
import {getGeometricMidpoint} from '../utils';
import {range} from 'lodash';
import './MecanoConstruction.css';
/**
 * Mecano construction
 */
class MecanoConstruction extends Component {
  /**
   * Returns:
   * 1. A bounding rectangle.
   * 2. Circle at the geometric midpoint.
   * 3. Rectangles around each cell.
   * @return {ReactElement}
   */
  render() {
    // let theme = this.props.theme;
    let bounds = this.props.bounds;
    let canvas = this.props.canvas;
    let grid = this.props.grid;
    let padding = this.props.padding;
    let geometricMidpoint = getGeometricMidpoint(bounds);
    let cells = [];
    range(grid.X, canvas.X, grid.X).forEach((x, indexX) => {
        range(grid.Y, canvas.Y, grid.Y).forEach((y, indexY) => {
            cells.push(
                <rect
                className="cell-outer"
                x={x-grid.X/2}
                y={y-grid.Y/2}
                width={grid.X}
                height={grid.Y}
                key={'cell-outer' + indexX + '-' + indexY}
                />
            );
            cells.push(
                <rect
                className="cell-inner"
                x={x-grid.X/2+padding.X}
                y={y-grid.Y/2+padding.Y}
                width={grid.X-padding.X*2}
                height={grid.Y-padding.Y*2}
                key={'cell-inner' + indexX + '-' + indexY}
                />
            );
        });
    });
    return (
      <g>
        {cells}
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
MecanoConstruction.propTypes = {
  theme: PropTypes.object.isRequired,
  bounds: PropTypes.object.isRequired,
  canvas: PropTypes.object.isRequired,
  grid: PropTypes.object.isRequired,
  padding: PropTypes.object.isRequired,
};
export default withTheme()(MecanoConstruction);
