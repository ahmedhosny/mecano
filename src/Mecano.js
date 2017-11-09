import React, { Component } from 'react';
import update from 'immutability-helper';
import GlobalControls from './components/GlobalControls'
import LocalControls from './components/LocalControls'
import Construction from './components/Construction';
import {updateComponents} from './components/Utils'
import Data from './Data'
import Mapping from './Mapping'
import Guides from "./components/Guides"
import {updateMecano} from './components/UpdateUtils'
import './Mecano.css';



export default class Mecano extends Component {

	constructor(props) {
		super(props);
		this.state = {
			angle: 40,
			construction: true,
			startX: 300,
			startY: 300,
			buffer: 20,
			data : Data
		};
	}

  	// only once before intial render
  	componentWillMount() {
  		updateMecano(this)
  	}

  	// globalControls
	onChangeAngle(e) {
		this.setState({
			angle:e.target.value
		}, () => {
                updateMecano(this)
        });
  	}
  	onChangeConstruction(e) {
		this.setState({
			construction:e.target.checked
		});
  	} 
	onChangeBuffer(e) {
		this.setState({
			buffer:e.target.value
		}, () => {
                updateMecano(this)
        });
  	}


  	// localControls
  	// TODO: should not use index - use key instead
  	onChange(e) {

		const index = e.target.name;
		const value = e.target.value;

		const newSize = {
			'X':value,
			'Y':this.state.data.items[index].size.Y
		}

	    var updateEntity = (obj, newSize) => ({
			...obj,
			size: newSize,
		})

	    this.setState({
			...this.state,
			data: {'ids':this.state.data.ids,
			'items':[
			...this.state.data.items.slice(0, index),
			updateEntity(this.state.data.items[index], newSize),
			...this.state.data.items.slice(index + 1)
			]
		}}, () => {
			updateMecano(this)
		});

  	} 



  	render() {
  		console.log(this.state.data['ids'])
		return (
			<div>

				{/* globalControls */}
				<h4>globalControls</h4>
				<GlobalControls
				angle={this.state.angle}
				onChangeAngle={this.onChangeAngle.bind(this)}
				construction={this.state.construction}
				onChangeConstruction={this.onChangeConstruction.bind(this)}
				buffer={this.state.buffer} 
                onChangeBuffer={this.onChangeBuffer.bind(this)} 
				/>



				{/* LocalControls */}
				{/* TODO: should not use index - use key instead */}
				<h4>LocalControls</h4>
				{this.state.data.ids.map((m,index) => {
					var n = this.state.data.items.find(function (obj) { return obj.key === m; });
					console.log(n.size.X)
				    	return (
				      		<LocalControls
							value={n.size.X}
							name={index}
							onChange={this.onChange.bind(this)}
							key={"controls-"+n.key}
							/>
						)
				    })
				}

				{/* Graph */}
				<svg
				className="svg"
				height={500}
				width={1000}
				>
					{/* components */}				
					{this.state.data.ids.map((m,index) => {
						//
						var n = this.state.data.items.find(function (obj) { return obj.key === m; });
						var Component = Mapping[n.type].name
					      	return (
					      		<g
					      		key={"group-"+n.key}
					      		>
									<Component
									entity={n} 
									angle={this.state.angle}
									key={n.key}
									/> 
									{this.state.construction ?
					                    <Construction
					                    entity={n}
					                    radius={5}
					                    key={"construction-"+n.key}
					                    /> : null
					                }
				                </g>
							)
					    })
					}

					{/* guides */}
					{this.state.construction ?
	                    <Guides
	                    startX={this.state.startX}
	                    startY={this.state.startY}
	                    radius={5}
	                    /> : null
	                }
				</svg>
			</div>
		);
  	}
}

