import React, { Component } from 'react';
import GlobalControls from './components/GlobalControls'
import LocalControls from './components/LocalControls'
import Construction from './components/Construction';
import {dataGenerator} from './Data'
import Mapping from './Mapping'
import Guides from "./components/Guides"
import './Mecano.css';



export default class Mecano extends Component {

	constructor(props) {
		super(props);
		this.state = {
			angle: 30,
			construction: true,
			origin: {'X':300,'Y':300},
			offset: {'X':30,'Y':0}
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

  	// only once before intial render
  	componentWillMount(){
  		this.setState({
			data : dataGenerator(this.state.origin,this.state.angle,this.state.offset)
		});
  	}

  	// globalControls
	onChangeAngle(e) {
		const newAngle = e.target.value
		this.setState({
			angle: newAngle,
			data : dataGenerator(this.state.origin,newAngle,this.state.offset)
        });
  	}
  	onChangeConstruction(e) {
		this.setState({
			construction:e.target.checked
		});
  	} 
  	// TODO: Introduce offset for Y
	onChangeOffset(e) {
		const newOffset = {'X':e.target.value,'Y':0}
        this.setState({
			offset: newOffset ,
			data : dataGenerator(this.state.origin,this.state.angle,newOffset)
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
		return (
			<div>

				{/* globalControls */}
				<h4>globalControls</h4>
				<GlobalControls
				angle={this.state.angle}
				onChangeAngle={this.onChangeAngle.bind(this)}
				construction={this.state.construction}
				onChangeConstruction={this.onChangeConstruction.bind(this)}
				offset={this.state.offset} 
                onChangeOffset={this.onChangeOffset.bind(this)} 
				/>





				{/* Graph */}
				<svg
				className="svg"
				height={500}
				width={1000}
				onClick={this.onClick}
				>
					{/* components */}				
					{this.state.data.map((n,index) => {
						//
						var Component = Mapping[n.type].name
					      	return (
					      		<g
					      		key={"group-"+n.key}
					      		zIndex={index*-1}
					      		>
									<Component
									entity={n} 
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
	                    startX={this.state.origin.X}
	                    startY={this.state.origin.Y}
	                    radius={3}
	                    /> : null
	                }
				</svg>
			</div>
		);
  	}
}



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