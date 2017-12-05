import {base} from "./base"
import {line} from "./elastic"

class tag extends base{
	/**
	 * Basic tag class - other inherit from here.
	 * @param  {object} host - the host instance - a primative 
	 * @param  {string} component - What component to display in the bottomtag - could be 'shape' or ..
	 */
	constructor(
		host,
		component,
		mecano){
		super()
		// type
		this.type = 'tag'
		// arguments
		this.host = host
		this.component = component
		this.mecano = mecano
	}

}


export class bottomTag extends tag{
	constructor(...args){
		super(...args)
		this.halfLine = 30
	}
	draw(){
		const anchor = this.host.tagAnchors.bottom[0]
		const _line = new line(
			[{'X':anchor.X-this.halfLine,'Y':anchor.Y}],
			[{'X':anchor.X+this.halfLine,'Y':anchor.Y}],
			[0],
			[0]
		)
		_line.draw()
		this.coordinates.push(_line.coordinates[0])
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
	constructor(...args){
		super(...args)
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