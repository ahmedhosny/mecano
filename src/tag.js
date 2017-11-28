import {base} from "./base"
import {setBottomTagtext} from "./utils"

class tag extends base{
	/**
	 * Basic tag class - other inherit from here.
	 * @param  {object} host - the host instance - a primative 
	 * @param  {string} display - What to display in the bottomtag - could be 'shape' or ..
	 */
	constructor(host,display){
		super()
		this.type = 'tag'
		this.host = host
		this.display = display
	}

}


export class bottomTag extends tag{
	draw(){
		// set the text
		setBottomTagtext(this)
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

