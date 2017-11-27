import {base} from "./base"
import {setBottomTagtext} from "./utils"

class tag extends base{
	/**
	 * Base tag class - other inherit from here.
	 * @param  {object} host - the host instance - a primative usually
	 */
	constructor(host){
		super()
		this.host = host
	}

}


export class bottomTag extends tag{
	/**
	 * A bottom tag
	 * @param  {object} host - the host instance - a primative 
	 * @param  {string} display - What to display in the bottomtag - could be 'shape' or ..
	 */
	constructor(host,display){
		super(host);
		setBottomTagtext(host,this,display)
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

