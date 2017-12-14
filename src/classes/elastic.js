import {base} from "./base"
import {zipWith} from 'lodash';
import {plane} from './primative'


class elastic extends base{
	/**
	 * Constructs the base class
	 * @param  {Array} coordsFrom - chosen out coords of primativeFrom [[{'X':0,'Y':0},{'X':0,'Y':0}...]
	 * @param  {Array} coordsTo - chosen out coords of primativeFrom [[{'X':0,'Y':0},{'X':0,'Y':0}...]
	 * @param  {Number} options.angle - from mecano.state
	 * @param  {Object} options.paramsFrom - kernel size and other info of primativeFrom - from input in data.js
	 * @param  {Object} options.paramsTo - kernel size and other info or primativeTo - from input in data.js
	 */
	constructor(
			coordsFrom,
			coordsTo,
			{
				angle=30,
				paramsFrom={},
				paramsTo={}
			}={} ){
				super()
				// arguments
				this.coordsFrom = coordsFrom;
				this.coordsTo = coordsTo;
				this.angle = angle;
				this.paramsFrom = paramsFrom; 
				this.paramsTo = paramsTo;
	}
}

export class line extends elastic{
	/**
	 * Draws a line(s) between the specific indicies of coordsA and coordsB
	 */
	draw(){
		var _this = this;
		zipWith(this.coordsFrom,this.coordsTo, function(_from, to) {
			_this.coordinates.push({
				'X1':_from.X,
				'Y1':_from.Y,
				'X2':to.X,
				'Y2':to.Y});
		});
	}
}

export class pyramid extends elastic{
	/**
	 * Draws the base of the sideways pyramid followed by two triangles representing the sides.
	 * Can scale to draw multiple pyramids at once
	 * First two lists are the two triangles and the third is the hidden line
	 */
	draw(){
		var _this = this
		zipWith(this.coordsFrom,this.coordsTo, function(_from, to) {
			const _plane = new plane(
				 {'D0':1,'D1':_this.paramsTo.kernel.D1,'D2':_this.paramsTo.kernel.D2},
				 _this.angle,
				 _from
			)
			_plane.draw()
			const coords = _plane.coordinates[0]
			const triangle1 = [coords[0],coords[1],coords[2],coords[3],to.X,to.Y]
			const triangle2 = [coords[2],coords[3],coords[4],coords[5],to.X,to.Y]
			const hidden = [
				coords[0],coords[1],
				coords[6],coords[7],
				coords[4],coords[5]
			]
			_this.coordinates.push([triangle1,triangle2,hidden])
		});
	}

}
			

