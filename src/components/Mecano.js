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
   * Sets state - no props.
   * @todo Origin can be moved to props.
   * @todo Margin (compact view) and padding (primative <-> tag) not used.
   */
  constructor() {
    super();
    this.state = {
      angle: 50,
      construction: true,
      canvas: {X: 3600, Y: 3600},
      grid: {X: 300, Y: 300},
      origin: {X: 300, Y: 1800},
      margin: {X: 25, Y: 0},
      padding: {X: 0, Y: 30},
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
   * Component will mount. Updates data
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
    const newAngle = e.target.value;
    let _this = this;
    this.setState(
      {
        angle: newAngle,
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
   * Sets the margin, then updates data.
   * @todo Not used for now.
   * @param  {[type]} e Event.
   */
  onChangemargin(e) {
    const newmargin = {X: e.target.value, Y: 0};
    let _this = this;
    this.setState(
      {
        margin: newmargin,
      },
      function() {
        _this.updateData();
      }
    );
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
              margin={this.state.margin}
              onChangemargin={this.onChangemargin.bind(this)}
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
                    data={this.state.data}
                    construction={this.state.construction}
                    bounds={this.state.bounds}
                    canvas={this.state.canvas}
                    grid={this.state.grid}
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
