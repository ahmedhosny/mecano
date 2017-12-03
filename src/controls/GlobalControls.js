import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Switch from 'material-ui/Switch';
import Typography from 'material-ui/Typography';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import Paper from 'material-ui/Paper';
import { withTheme } from 'material-ui/styles';


class GlobalControls extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { theme } = this.props;
        return (
            <Paper style={theme.controlPaper}>
                <Typography type="Title">
                    Controls
                </Typography>
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
            </Paper>
        );
    }
}

export default withTheme()(GlobalControls);