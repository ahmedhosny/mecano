import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Switch from 'material-ui/Switch';
import Typography from 'material-ui/Typography';
import {FormControlLabel, FormGroup} from 'material-ui/Form';
import {withTheme} from 'material-ui/styles';
/**
 * Global controls.
 */
class GlobalControls extends Component {
  /**
   * Returns a text title and a few contols.
   * @return {ReactElement}
   */
  render() {
    return (
      <div>
        <Typography type="title">Controls</Typography>
        {/* TODO: implement slide*/}
        <TextField
          value={this.props.angle}
          onChange={this.props.onChangeAngle}
          label="angle"
          margin="normal"
        />
        {/* TODO: implement slide*/}
        <TextField
          value={this.props.margin.X}
          onChange={this.props.onChangemargin}
          label="marginX"
          margin="normal"
        />
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={this.props.construction}
                onChange={this.props.onChangeConstruction}
              />
            }
            label="construction"
          />
        </FormGroup>
      </div>
    );
  }
}
GlobalControls.propTypes = {
  angle: PropTypes.number.isRequired,
  onChangeAngle: PropTypes.func.isRequired,
  construction: PropTypes.bool.isRequired,
  onChangeConstruction: PropTypes.func.isRequired,
  margin: PropTypes.object.isRequired,
  onChangemargin: PropTypes.func.isRequired,
};
export default withTheme()(GlobalControls);
