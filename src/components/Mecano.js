import React, { Component } from 'react';
import {dataGenerator} from '../data'
import {components} from '../mapping'
// controls
import GlobalControls from '../controls/GlobalControls'
// import LocalControls from '../controls/LocalControls'
// helpers
import Construction from '../helpers/Construction';
import Guides from '../helpers/Guides';
// UI
import Grid from 'material-ui/Grid';
import { withTheme } from 'material-ui/styles';
import Paper from 'material-ui/Paper';




class Mecano extends Component {

	constructor(props) {
		super(props);
		this.state = {
			angle: 30,
			construction: false,
			origin: {'X':150,'Y':300}, // can be props
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

	//
	onClick(evt){
		var e = evt.target;
	    var dim = e.getBoundingClientRect();
	    var x = evt.clientX - dim.left;
	    var y = evt.clientY - dim.top;
	    console.log("x: "+x+" y:"+y);
	}

	updateData(){
		this.setState({
			data : dataGenerator(this)
        });
	}

  	// only once before intial render
  	componentWillMount(){
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


  // 	// localControls
  // 	// TODO: should not use index - use key instead
  // 	onChange(e) {

		// const index = e.target.name;
		// const value = e.target.value;

		// const newSize = {
		// 	'X':value,
		// 	'Y':this.state.data.items[index].size.Y
		// }

	 //    var updateEntity = (obj, newSize) => ({
		// 	...obj,
		// 	size: newSize,
		// })

	 //    this.setState({
		// 	...this.state,
		// 	data: {'ids':this.state.data.ids,
		// 	'items':[
		// 	...this.state.data.items.slice(0, index),
		// 	updateEntity(this.state.data.items[index], newSize),
		// 	...this.state.data.items.slice(index + 1)
		// 	]
		// }}, () => {
		// 	updateMecano(this)
		// });

  // 	} 



  	render() {
  		const { theme } = this.props;
		return (
				<Grid container spacing={24}>
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
					<Grid 
					item 
					xs={12} 
					md={10}
					>
						<Paper style={theme.mecano}>
						{/* Graph */}
							<svg
							onClick={this.onClick}
							style={theme.mecano}
							>
								{/* components */}				
								{this.state.data.map((n,index) => {
									//
									var Component = components[n.component].component
								      	return (
								      		<g
								      		key={"group-"+n.key}
								      		>
												<Component
												instance={n} 
												/> 
												{this.state.construction ?
								                    <Construction
								                    instance={n}
								                    radius={5}
								                    /> : null
								                }
							                </g>
										)
								    })
								}

								{/* guides */}
								{this.state.construction ?
				                    <Guides
				                    startX={this.state.origin.X}
				                    startY={this.state.origin.Y}
				                    bounds={this.state.bounds}
				                    radius={3}
				                    /> : null
				                }
							</svg>
						</Paper>
					</Grid>
				</Grid>
		);
  	}
}

export default withTheme()(Mecano);

				// {/* LocalControls */}
				// {/* TODO: should not use index - use key instead */}
				// <h4>LocalControls</h4>
				// {this.state.data.map((n,index) => {
				//     	return (
				//       		<LocalControls
				// 			value={n.size.X}
				// 			name={index}
				// 			onChange={this.onChange.bind(this)}
				// 			key={"controls-"+n.key}
				// 			/>
				// 		)
				//     })
				// }