import {base} from "./base"

class tag extends base{
	/**
	 * Basic tag class - other inherit from here.
	 * @param  {object} host - the host instance - a primative 
	 * @param  {string} component - What component to display in the bottomtag - could be 'shape' or ..
	 */
	constructor(host,component,mecano){
		super()
		this.type = 'tag'
		this.host = host
		this.component = component
		this.mecano = mecano
	}

}


export class bottomTag extends tag{
	constructor(host,component,mecano){
		super(host,component,mecano)
		this.halfLine = 30
	}
	draw(){
		const anchor = this.host.tagAnchors.bottom[0]
		this.coordinates.push({
			'X1':anchor.X-this.halfLine,
			'Y1':anchor.Y,
			'X2':anchor.X+this.halfLine,
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
	constructor(host,component,mecano){
		super(host,component,mecano)
		this.peak = this.mecano.state.bounds.min.Y - this.mecano.state.padding.Y
		this.minimumLength = 35
	}
	draw(){
		const anchor = this.host.tagAnchors.top[0]
		this.coordinates.push({
			'X1':anchor.X,
			'Y1':anchor.Y,
			'X2':anchor.X,
			'Y2':this.peak - this.minimumLength,
		})
		// text
		const component = this.component;
		const tag = this.host.tags.filter(function( object ) {
			return object.component === component;
		});
		this.text1 = tag[0].text1
	}
}