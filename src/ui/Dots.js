import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withTheme} from 'material-ui/styles';
import {range} from 'lodash';
/**
 * Creates dots on a grid.
 */
class Dots extends Component {
  /**
   * Returns circles on the gird.
   * @return {ReactElement}
   */
    render() {
        const {theme} = this.props;
        let dots = [];
        range(this.props.grid.X, this.props.canvas.X, this.props.grid.X)
        .forEach((x, indexX) => {
            range(this.props.grid.Y, this.props.canvas.Y, this.props.grid.Y)
            .forEach((y, indexY) => {
                dots.push(
                    <circle
                    fill={theme.palette.primary['800']}
                    r={3}
                    cx={x}
                    cy={y}
                    key={'dot' + indexX + '-' + indexY}
                    />
                );
            });
        });
        return (
            <g>
            {dots}
            </g>
        );
    }
}
Dots.propTypes = {
  theme: PropTypes.object.isRequired,
  grid: PropTypes.object.isRequired,
  canvas: PropTypes.object.isRequired,
};
export default withTheme()(Dots);
