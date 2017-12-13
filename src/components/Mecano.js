import React, { Component } from 'react';
import {dataGenerator} from '../data'
import Viewer from './Viewer'
// controls
import GlobalControls from '../controls/GlobalControls'
// import LocalControls from '../controls/LocalControls'

// UI
import Grid from 'material-ui/Grid';
import { withTheme } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import {AutoSizer} from 'react-virtualized';

class Mecano extends Component {

	constructor(props) {
		super(props);
		this.state = {
			angle: 30,
			construction: true,
			canvas:{'X':3600,'Y':3600},
			grid:{'X':300,'Y':300},
			origin: {'X':300,'Y':1800}, // can be props
			margin: {'X':25,'Y':0},
			padding: {'X':0,'Y':30},
			bounds: {
	            'min':{
	                'X':0,
	                'Y':0
	            },
	            'max':{
	                'X':0,
	                'Y':0
	            }
	        }
		};
	}
	updateData(){
		this.setState({
			data : dataGenerator(this)
        });
	}
  	// only once before intial render
  	componentWillMount(){
  		// TODO: bounds currently only works on primatives (tags are cut off)
		this.updateData()
  	}
  	// globalControls
	onChangeAngle(e) {
		const newAngle = e.target.value
		this.setState({
			angle : newAngle
        },function(){
        	this.updateData()
        });
  	}
  	onChangeConstruction(e) {
		this.setState({
			construction:e.target.checked
		});
  	} 
  	// TODO: Introduce margin for Y
	onChangemargin(e) {
		const newmargin = {'X':e.target.value,'Y':0}
		this.setState({
			margin: newmargin
        },function(){
        	this.updateData()
        });
  	}
  	render() {
  		const { theme } = this.props;
		return (
			<Grid container spacing={24}>
				{/* Controls */}
				<Grid 
				item 
				xs={12} 
				md={2} 
          		>
					<GlobalControls
					angle={this.state.angle}
					onChangeAngle={this.onChangeAngle.bind(this)}
					construction={this.state.construction}
					onChangeConstruction={this.onChangeConstruction.bind(this)}
					margin={this.state.margin} 
	                onChangemargin={this.onChangemargin.bind(this)} 
					/>
				</Grid>
				{/* Graph */}
				<Grid 
				item 
				xs={12} 
				md={10}
				>
					<Paper style={theme.viewer}> 
						<AutoSizer>
  							{(({width, height}) => width === 0 || height === 0 ? null : (
  								<Viewer
  								width={width}
  								height={height}
  								data={this.state.data}
  								construction={this.state.construction}
  								bounds={this.state.bounds}
  								canvas={this.state.canvas}
  								grid={this.state.grid}
  								/>
							))}
						</AutoSizer>
					</Paper>
				</Grid>
			</Grid>
		);
  	}
}

export default withTheme()(Mecano);