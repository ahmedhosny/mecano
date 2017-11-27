import {base} from "./base"
import {zipWith} from 'lodash';
import {plane} from './primative'

class elastic extends base{
}

export class line extends elastic{
	/**
	 * Sets the coordinates of the tracer given the out of primatives before and after.
	 * IdxA and idxB should be of equal length
	 * @param  {primative} primativeA - .out = [{'X':0,'Y':0},{'X':0,'Y':0}...]
	 * @param  {primative} primativeB - .out =[{'X':0,'Y':0},{'X':0,'Y':0}...]
	 * @param  {int} angle - from mecano state
	 * @param  {object} object from 'after' in mapping.js
	 */
	draw(primativeA,primativeB,object,angle){
		var idxA = object.beforeOut
		var idxB = object.afterOut
		var _this = this
		zipWith(idxA,idxB, function(a, b) {
			_this.coordinates.push({
				'X1':primativeA.out[a].X,
				'Y1':primativeA.out[a].Y,
				'X2':primativeB.out[b].X,
				'Y2':primativeB.out[b].Y})
		});
	}
}

export class pyramid extends elastic{

	/**
	 * Draws the base of the sideways pyramid followed by two triangles representing the sides.
	 * Can scale to draw multiple pyramids at once
	 * First two lists are the two triangles and the third is the hidden line
	 * @param  {primative} primativeA - .out = [{'X':0,'Y':0},{'X':0,'Y':0}...]
	 * @param  {primative} primativeB - .out =[{'X':0,'Y':0},{'X':0,'Y':0}...]
	 * @param  {object} object from 'after' in mapping.js
	 * @param  {int} angle - from mecano state
	 */
	draw(primativeA,primativeB,object,angle){
		const idxA = object.beforeOut
		const idxB = object.afterOut
		var _this = this
		zipWith(idxA,idxB, function(a, b) {
			// Draws the plane "base" of the sideways pyramid
			const _in = primativeA.out[a]
			const dummyInputObject = {'name':'foo','size':{'X':primativeB.size.KX,'Y':primativeB.size.KY}}
			const _plane = new plane(dummyInputObject, _in , angle , {'X':0 ,'Y':0})
			_plane.draw(0)
			const triangle1 = [_plane.out[1].X,_plane.out[1].Y,_plane.out[2].X,_plane.out[2].Y,primativeB.out[b].X,primativeB.out[b].Y]
			const triangle2 = [_plane.out[2].X,_plane.out[2].Y,_plane.out[3].X,_plane.out[3].Y,primativeB.out[b].X,primativeB.out[b].Y]
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