import React, { Component } from 'react';
import {ReactSVGPanZoom} from 'react-svg-pan-zoom';
import {components} from '../mapping'
// UI
import { withTheme } from 'material-ui/styles';
import Dots from '../ui/Dots';
// helpers
import Construction from '../helpers/Construction';
import Bbox from '../helpers/Bbox';



class Viewer extends Component {
	constructor(props) {
		super(props);
		this.Viewer = null;
	}
	componentDidMount() {
		var bounds = this.props.bounds		
		this.Viewer.fitSelection(bounds.min.X,bounds.min.Y,bounds.max.X-bounds.min.X,bounds.max.Y-bounds.min.Y)
	}
  	render() {
  		const { theme } = this.props;
		return (
			<ReactSVGPanZoom
			ref={Viewer => this.Viewer = Viewer}
			SVGBackground={theme.viewer.backgroundColor}
			background={theme.palette.grey['300']}
			width={this.props.width} 
			height={this.props.height} 
			onClick={event => console.log('click', event.x, event.y, event.originalEvent)}
			// scaleFactorOnWheel={5}
			// onMouseUp={event => console.log('up', event.x, event.y)}
			// onMouseMove={event => console.log('move', event.x, event.y)}
			// onMouseDown={event => console.log('down', event.x, event.y)}
			// scaleFactor={500}
			tool={'auto'}
			toolbarPosition={'none'}
			miniaturePosition={'none'}
			detectAutoPan={false}
			disableDoubleClickZoomWithToolAuto={true}
			>
				<svg
				width={this.props.canvas.X} 
				height={this.props.canvas.Y} 
				>
					{/* grid */}
					<Dots
					canvas={this.props.canvas}
					grid={this.props.grid}
					/>
 					{/* components */}				
					{this.props.data.map((n,index) => {
						var Component = components[n.component].component
					      	return (
					      		<g
					      		key={"group-"+n.key}
					      		onClick={event => console.log("clicked on: ", n.name)}
					      		>
									<Component
									instance={n}
									/> 
									{this.props.construction ?
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
					{this.props.construction ?
	                    <Bbox
		                    bounds={this.props.bounds}
		                    radius={3}
	                    /> : null
	                }
				</svg>
			</ReactSVGPanZoom>
		);
  	}
}
export default withTheme()(Viewer);
