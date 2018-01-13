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
   * 1. A bounding rectangle around entire mecano
   * 2. Circle at the geometric midpoint of mecano.
   * 3. 4 Rectangles around each cell to show padding and text.
   * @return {ReactElement}
   */
  render() {
    // let theme = this.props.theme;
    let tagHeight = this.props.mecanoState.tagHeight;
    let bounds = this.props.mecanoState.bounds;
    let canvas = this.props.mecanoState.canvas;
    let grid = this.props.mecanoState.grid;
    let padding = this.props.mecanoState.padding;
    let geometricMidpoint = getGeometricMidpoint(bounds);
    let cells = [];
    range(grid.X, canvas.X*grid.X, grid.X).forEach((x, indexX) => {
        range(grid.Y, canvas.Y*grid.Y, grid.Y).forEach((y, indexY) => {
            cells.push(
              <g
              key={'MecanoConstruction' + indexX + '-' + indexY}>
                <rect
                className="cellOuter"
                x={x-grid.X/2}
                y={y-grid.Y/2}
                width={grid.X}
                height={grid.Y}
                key={'cell-outer' + indexX + '-' + indexY}
                />
                <rect
                className="cellInner1"
                x={x-grid.X/2+padding.X}
                y={y-grid.Y/2+padding.Y}
                width={grid.X-padding.X*2}
                height={grid.Y-padding.Y*2}
                key={'cell-inner-1' + indexX + '-' + indexY}
                />
                <rect
                className="cellInner2"
                x={x-grid.X/2+padding.X}
                y={y-grid.Y/2+padding.Y+tagHeight}
                width={grid.X-padding.X*2}
                height={grid.Y-padding.Y*2-tagHeight*2}
                key={'cell-inner-2' + indexX + '-' + indexY}
                />
                <rect
                className="cellInner3"
                x={x-grid.X/2+padding.X}
                y={y-grid.Y/2+padding.Y*2+tagHeight}
                width={grid.X-padding.X*2}
                height={grid.Y-padding.Y*4-tagHeight*2}
                key={'cell-inner-3' + indexX + '-' + indexY}
                />
              </g>
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
  mecanoState: PropTypes.object.isRequired,
};
export default withTheme()(MecanoConstruction);
