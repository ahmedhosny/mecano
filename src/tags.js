import {base} from "./base"

class tags extends base{
	/**
	 * Base tag class - other inherit from here.
	 * @param  {object} host - the host instance - a primative usually
	 */
	constructor(host){
		super()
		this.host = host
	}

}


export class bottomTag extends tags{
	/**
	 * A bottom tag
	 * @param  {object} host - the host instance - a primative usually
	 * @param  {list} text - list of strings to be displayed
	 */
	constructor(host,text){
		super(host,text);
		this.text1 = text[0]
		this.text2 = text[1]
	}

	/**
	 * Draws the bottom tag
	 */
	draw(){
		// line
		const line = 30 // on either side
		const anchor = this.host.tagAnchors.bottom[0]
		this.coordinates.push({
			'X1':anchor.X-line,
			'Y1':anchor.Y,
			'X2':anchor.X+line,
			'Y2':anchor.Y,
		})
	}

}

