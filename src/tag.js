import {base} from "./base"

class tag extends base{
	/**
	 * Basic tag class - other inherit from here.
	 * @param  {object} host - the host instance - a primative 
	 * @param  {string} component - What component to display in the bottomtag - could be 'shape' or ..
	 */
	constructor(host,component){
		super()
		this.type = 'tag'
		this.host = host
		this.component = component
	}

}


export class bottomTag extends tag{
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
		// text
		const component = this.component;
		const tag = this.host.tags.filter(function( object ) {
			return object.component === component;
		});
		this.text1 = tag[0].text1
		this.text2 = tag[0].text2
	}
}

export class topTag extends tag{
	draw(){
		// line
		// const line = 30 // on either side
		const anchor = this.host.tagAnchors.top[0]
		this.coordinates.push({
			'X1':anchor.X,
			'Y1':anchor.Y,
			'X2':anchor.X,
			'Y2':anchor.Y-150,
		})
		// // text
		// const component = this.component;
		// const tag = this.host.tags.filter(function( object ) {
		// 	return object.component == component;
		// });
		// this.text1 = tag[0].text1
		// this.text2 = tag[0].text2
	}
}