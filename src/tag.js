import {base} from "./base"
import {line} from "./elastic"
import {zipWith} from 'lodash';


class tag extends base{
	/**
	 * Basic tag class - other inherit from here.
	 * @param  {Object} tag - tag entry from primative.tags - looks something like this {'component':'Name', 'text1': this.name}
	 * @param  {Object} tagAnchors - from primative.tagAnchors - looks something like this {'top':[],'bottom':[]}
	 */
	constructor(
			tag,
			tagAnchors
		){
			super()
			// type
			this.type = 'tag'
			// arguments
			this.tag = tag
			this.tagAnchors = tagAnchors
	}

	/**
	 * Draws line(s) and adds to coordinates
	 * @param  {Array} coordsFrom - Array of coordiante objects {'X':00,'Y':00}
	 * @param  {Array} coordsTo - Array of coordiante objects {'X':00,'Y':00}
	 */
	drawLines(coordsFrom,coordsTo){
		var _this = this
		zipWith(coordsFrom,coordsTo,function(_from, to) {
			const _line = new line([_from],[to])
			_line.draw()
			_this.coordinates.push(_line.coordinates[0])
		});
	}

}


export class bottomTag extends tag{
	constructor(...args){
		super(...args)
		this.halfLine = 30
	}
	draw(){
		// get anchor
		const anchor = this.tagAnchors.bottom[0]
		// draw line
		this.drawLines(
			[{'X':anchor.X-this.halfLine,
			'Y':anchor.Y}],
			[{'X':anchor.X+this.halfLine,
			'Y':anchor.Y}]
		)
		// draw text
		this.text1 = this.tag.text1
		this.text2 = this.tag.text2
	}
}


export class topTag extends tag{
	constructor(...args){
		super(...args)
		this.peak =  200 //this.mecano.state.bounds.min.Y - this.mecano.state.padding.Y
		this.minimumLength = 35
	}
	draw(){
		// get anchor
		const anchor = this.tagAnchors.top[0]
		// draw line
		this.drawLines(
			[{'X':anchor.X,
			'Y':anchor.Y}],
			[{'X':anchor.X,
			'Y':this.peak - this.minimumLength}]
		)
		// draw text
		this.text1 = this.tag.text1
	}
}