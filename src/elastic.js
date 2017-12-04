import {base} from "./base"
import {zipWith} from 'lodash';
import {plane} from './primative'


class elastic extends base{
	/**
	 * basic elastic class
	 * @param  {primative} primativeA - on the left of elastic .out = [{'X':0,'Y':0},{'X':0,'Y':0}...]
	 * @param  {primative} primativeB - on the right of elastic .out =[{'X':0,'Y':0},{'X':0,'Y':0}...]
	 * @param  {object} mappingObject from 'after' in mapping.js
	 * @param {react component} mecano
	 */
	constructor(primativeA,primativeB,mappingObject,mecano){
		super()
		this.type = 'elastic'
		this.primativeA = primativeA;
		this.primativeB = primativeB;
		this.mappingObject = mappingObject;
		this.mecano = mecano
	}
}

export class line extends elastic{

	draw(){
		var idxA = this.mappingObject.beforeOut
		var idxB = this.mappingObject.afterOut
		var _this = this
		zipWith(idxA,idxB, function(a, b) {
			_this.coordinates.push({
				'X1':_this.primativeA.out[a].X,
				'Y1':_this.primativeA.out[a].Y,
				'X2':_this.primativeB.out[b].X,
				'Y2':_this.primativeB.out[b].Y})
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
		const idxA = this.mappingObject.beforeOut
		const idxB = this.mappingObject.afterOut
		var _this = this
		zipWith(idxA,idxB, function(a, b) {


			const _plane = new plane("isko",
					                {'D0':1,'D1':_this.primativeB.params.kernel.D1,'D2':_this.primativeB.params.kernel.D2},
					                {},
					                _this.mecano.state.angle,
					                _this.primativeA.out[a],
					                _this.mecano.state.padding,
					                _this.mecano.state.margin)

			// const _plane = new plane({ 	
			// 		name : "isko", 
			// 		shape : {'D0':1,'D1':_this.primativeB.params.kernel.D1,'D2':_this.primativeB.params.kernel.D2},
			// 		params : {},
			// 		angle : _this.mecano.state.angle,
			// 		origin : _in,
			// 		padding : _this.mecano.state.padding,
			// 		margin : _this.mecano.state.margin
			// 	})




			_plane.draw(0)


			const coords = _plane.coordinates[0]
			const triangle1 = [coords[0],coords[1],coords[2],coords[3],_this.primativeB.out[b].X,_this.primativeB.out[b].Y]
			const triangle2 = [coords[2],coords[3],coords[4],coords[5],_this.primativeB.out[b].X,_this.primativeB.out[b].Y]
			const hidden = [
				coords[0],coords[1],
				coords[6],coords[7],
				coords[4],coords[5]
			]
			_this.coordinates.push([triangle1,triangle2,hidden])
		});
	}

}
			

