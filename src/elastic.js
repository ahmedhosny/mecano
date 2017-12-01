import {base} from "./base"
import {zipWith} from 'lodash';
import {plane} from './primative'

class elastic extends base{
	/**
	 * basic elastic class
	 * @param  {primative} primativeA - on the left of elastic .out = [{'X':0,'Y':0},{'X':0,'Y':0}...]
	 * @param  {primative} primativeB - on the right of elastic .out =[{'X':0,'Y':0},{'X':0,'Y':0}...]
	 * @param  {object} mappingObject from 'after' in mapping.js
	 * @param  {int} angle - from mecano state
	 */
	constructor(primativeA,primativeB,mappingObject,angle){
		super()
		this.type = 'elastic'
		this.primativeA = primativeA;
		this.primativeB = primativeB;
		this.mappingObject = mappingObject;
		this.angle = angle
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
			// Draws the plane "base" of the sideways pyramid
			const _in = _this.primativeA.out[a]
			// substitute the shape with kernel values
			const dummyInputObject = {'name':'foo','shape':{'D0':1,'D1':_this.primativeB.kernel.D1,'D2':_this.primativeB.kernel.D2}}
			const _plane = new plane(dummyInputObject, _in , _this.angle , {'X':0 ,'Y':0})
			_plane.draw(0)
			const triangle1 = [_plane.out[1].X,_plane.out[1].Y,_plane.out[2].X,_plane.out[2].Y,_this.primativeB.out[b].X,_this.primativeB.out[b].Y]
			const triangle2 = [_plane.out[2].X,_plane.out[2].Y,_plane.out[3].X,_plane.out[3].Y,_this.primativeB.out[b].X,_this.primativeB.out[b].Y]
			const coords = _plane.coordinates[0]
			const hidden = [
				coords[0],coords[1],
				coords[6],coords[7],
				coords[4],coords[5]
			]
			_this.coordinates.push([triangle1,triangle2,hidden])
		});
	}

}