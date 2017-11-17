import {base} from "./base"
import {zipWith} from 'lodash';

class elastic extends base{
	// constructor(){
	// 	super();
	// }
}

export class line extends elastic{
	// constructor(){
	// 	super();
	// }
	/**
	 * Sets the coordinates of the tracer given the out of primatives before and after.
	 * IdxA and idxB should be of equal length
	 * @param  {primative} primativeA - .out = [{'X':0,'Y':0},{'X':0,'Y':0}...]
	 * @param  {primative} primativeB - .out =[{'X':0,'Y':0},{'X':0,'Y':0}...]
	 * @param  {object} object from links list in Mapping.js
	 */
	draw(primativeA,primativeB,linksObject){
		var idxA = linksObject.beforeOut
		var idxB = linksObject.afterOut
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
