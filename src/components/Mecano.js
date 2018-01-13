import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {dataGenerator} from '../data';
import Viewer from './Viewer';
import GlobalControls from '../controls/GlobalControls';
import Grid from 'material-ui/Grid';
import {withTheme} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import {AutoSizer} from 'react-virtualized';
/**
 * Mecano owns the viewer, data and global controls.
 */
class Mecano extends Component {
  /**
   * Sets state.
   * Some state is calculated on the fly.
   * @todo Origin can be moved to props.
   * @todo Margin (compact view) and padding (primative <-> tag) not used.
   */
  constructor() {
    super();
    this.state = {
      angle: 30,
      construction: true,
      canvas: {X: 10, Y: 10},
      grid: {X: 360, Y: 500},
      padding: {X: 20, Y: 20},
      tagHeight: 50,
      bounds: {
        min: {
          X: 0,
          Y: 0,
        },
        max: {
          X: 0,
          Y: 0,
        },
      },
    };
    this.state.cell = {X: this.state.grid.X - this.state.padding.X*2,
           Y: this.state.grid.Y - this.state.padding.Y*4 -
           this.state.tagHeight*2};
    this.state.origin = {X: this.state.grid.X,
      Y: (this.state.canvas.Y*this.state.grid.Y)/2};
  }
  /**
   * Updates the data and sets the state.
   */
  updateData() {
    this.setState({
      data: dataGenerator(this),
    });
  }
  /**
   * Component will mount.
   */
  componentWillMount() {
    this.updateData();
  }
  /**
   * On Angle change.
   * Sets angle state, then updates data.
   * @param  {Object} e Event.
   */
  onChangeAngle(e) {
    let newAngle = e.target.value;
    if (newAngle==='') {
      newAngle=0;
    }
    let _this = this;
    this.setState(
      {
        angle: parseInt(newAngle, 10),
      },
      function() {
        _this.updateData();
      }
    );
  }
  /**
   * On toggling construction lines on and off.
   * Sets state.
   * @param  {[type]} e Event
   */
  onChangeConstruction(e) {
    this.setState({
      construction: e.target.checked,
    });
  }
  /**
   * Returns a grid of two columns, with AutoSizer.
   * 2 for controls.
   * 10 for viewer
   * @return {ReactElement}
   */
  render() {
    const {theme} = this.props;
    return (
      <Grid container spacing={24}>
        {/* Controls */}
        <Grid item xs={12} md={2}>
          <Paper style={theme.control}>
            <GlobalControls
              angle={this.state.angle}
              onChangeAngle={this.onChangeAngle.bind(this)}
              construction={this.state.construction}
              onChangeConstruction={this.onChangeConstruction.bind(this)}
            />
          </Paper>
        </Grid>
        {/* Graph */}
        <Grid item xs={12} md={10}>
          <Paper style={theme.viewer}>
            <AutoSizer>
              {({width, height}) =>
                width === 0 || height === 0 ? null : (
                  <Viewer
                    width={width}
                    height={height}
                    mecanoState={this.state}
                  />
                )
              }
            </AutoSizer>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}
Mecano.propTypes = {
  theme: PropTypes.object.isRequired,
};
export default withTheme()(Mecano);
