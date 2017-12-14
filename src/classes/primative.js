import {base} from "./base"
import {flatten,pullAt} from 'lodash';
import {range,getPlaneCoordinates,getGeometricMidpoint,setBounds} from './utils'





class primative extends base{
	/**
	 * Basic primative class - other inherit from here.
	 * @param  {Object} shape - shape of primative - from input in data.js  {'D0':1,'D1':224,'D2':224,...}
	 * @param  {int} angle - view angle - from mecano
	 * @param  {Object} origin - where all primatives are drawn for the first time
	 * @param  {String} options.name - name of primative - from input in data.js
	 * @param  {Object} options.params - kernel size and other info - from input in data.js
	 * @param  {Object} options.padding - padding between primative and its own tags - from mecano.state
	 * @param  {Object} options.margin - calculated in data.js depending on previous primative
	 */
	constructor(
			shape,
			angle,
			position,
			{
				name="someName",
				params={},
				padding={'X':0,'Y':0}
			} = {}){
				super()
				// type
				this.type = 'primative';
				// arguments
				this.shape = shape;
				this.angle = angle;
				this.position = position; // geomtric midpoint should be same as position when mounts
				this.name = name;
				this.params = params
				this.padding = padding; // only Y used for now
				// class-specifc
				this.in = {'X':0,'Y':0}; // changes for centering
				this.translation = {'X':0,'Y':0}; // for centering purposes
				this.out = [];
				this.bounds = {
		            'min':{
		                'X':0,
		                'Y':0
		            },
		            'max':{
		                'X':0,
		                'Y':0
		            }
		        };
		        this.geometricMidpoint = {'X':0,'Y':0}; // should be same as position when mounts
		        this.tagAnchors = {
		        	'top':[],
		        	'bottom':[]
		        	// can add sides here
		        };
	};


	/**
	 * Sets the bounding box X and Y coordinates of the entire primative
	 * works for plane and planeStack
	 */
	setBounds(){
		// flattens all
	    var coords = flatten(this.coordinates)
	    // split x and y coordinates
	    const allX = pullAt(coords, range(0,coords.length,2));
	    const allY = coords;
	    // set bounds
	    setBounds(allX,allY,this)
	}



	/**
	 * 1. Sets the translation distance to center the primative around the origin guide 
	 * 2. Sets the margin distance to avoid any overlaps 
	 * 3. moves the primative by setting the in values
	 * translation.X distance will always be negative
     * translation.Y distance will always be positive
	 */
	move(){
		// 1.figure out translation
		this.setBounds()
		this.geometricMidpoint = getGeometricMidpoint(this.bounds)
		this.translation.X = this.in.X - this.geometricMidpoint.X;
		this.translation.Y = this.in.Y - this.geometricMidpoint.Y;
		// 2.set
		this.in.X = this.position.X + this.translation.X 
		this.in.Y = this.position.Y + this.translation.Y 	
	}

	/**
	 * Sets the tag anchors for text, extra info...
	 */
	setTagAnchors(){
		// offset for planeStack - to centre the tag
		var offset = 0
		if (this.stack>1){ offset = this.coordinates[0][6] - this.coordinates[0][0] }
		this.tagAnchors.top = [{
			'X':parseInt((this.bounds.min.X+this.bounds.max.X + offset)/2,10),
			'Y':this.bounds.min.Y - this.padding.Y
		}]
		this.tagAnchors.bottom = [{
			'X':parseInt((this.bounds.min.X+this.bounds.max.X - offset)/2,10),
			'Y':this.bounds.max.Y + this.padding.Y
		}]
	}

}


export class plane extends primative{

	constructor(...args){
		super(...args);
		this.stack = 1;
		this.tags=[
			{
				'component':'Shape',
				'text1':'-',
				'text2': this.shape.D0 + "*" + this.shape.D1 + "*" + this.shape.D2 
			},
			{
				'component':'Name',
				'text1': this.name
			}
		];
	}

	/**
	 * Sets the out points for the plane primative
	 */
	setOut(){
		// get geometric midpoint after move
		this.geometricMidpoint = getGeometricMidpoint(this.bounds);
		// push midpoint
		this.out.push({'X':this.geometricMidpoint.X,'Y':this.geometricMidpoint.Y});
		// push specifc coords
		const idxs = [0,1,2];
		idxs.forEach((idx) => {
			this.out.push({'X':this.coordinates[0][idx*2],'Y':this.coordinates[0][idx*2+1]});
		});
	}

	/**
	 * Draws the plane by using the following steps
	 */
	draw(){
		//1// draw at original in {'X':0,'Y':0}
		this.coordinates = getPlaneCoordinates(this)
		//2// move and calculate new in coords
		this.move()
		//3// draw again to get new coordinates based on new in coords 
		this.coordinates = getPlaneCoordinates(this)
		//4// draw new bounds
		this.setBounds()
		//5// set out coords
		this.setOut()
		//6// push Anchors
		this.setTagAnchors()

	}

}


export class planeStack extends plane{

	constructor(...args){
		super(...args);
		this.stack = Math.max( Math.floor(this.shape.D3/10) , 2);
		this.stackPadding = 15;
		this.tags=[
			{
				'component':'Shape',
				'text1': this.shape.D3,
				'text2': this.shape.D0 + "*" + this.shape.D1 + "*" + this.shape.D2 
			},
			{
				'component':'Name',
				'text1': this.name
			}
		];
	}

	/**
	 * Calculate the geometric midpoint of a single plane - used for planeStack
	 * @param {int} index - index of list within this.coordinates
	 * @return {obj} the midpoint {'X':000,'Y':000}
	 */
	getPlaneGeometricMidpoint(index){
		const coords = this.coordinates[index].slice()
		const all_x = pullAt(coords, range(0,coords.length,2));
	    const all_y = coords;
	    var obj = {
	    	'X': parseInt((Math.max(...all_x) - Math.min(...all_x))/2, 10) + Math.min(...all_x) ,
			'Y': parseInt((Math.max(...all_y) - Math.min(...all_y))/2, 10) + Math.min(...all_y)
			}
	    return obj;
	}

	/**
	 * Sets the out coords for a single plane 
	 * @param {int} index - index of plane to set out coords for
	 */
	setPlaneOut(index){
		// plane center
		this.out.push(this.getPlaneGeometricMidpoint(index));
		// plane border
		const idxs = [0,1,2];
		idxs.forEach((idx) => {
			this.out.push({'X':this.coordinates[index][idx*2],'Y':this.coordinates[index][idx*2+1]});
		});
	}
	/**
	 * Sets the out points for the planeStack primative - overwrites the plane setOut()
	 */
	setOut(){
		//1// push midpoint
		this.geometricMidpoint = getGeometricMidpoint(this.bounds);
		this.out.push({'X':this.geometricMidpoint.X,'Y':this.geometricMidpoint.Y});
		//2// first plane
		this.setPlaneOut(0)
		//3// last plane
		this.setPlaneOut(this.coordinates.length-1)
	}

}