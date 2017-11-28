import {base} from "./base"
import {flatten,pullAt} from 'lodash';
import {range,getPlaneCoordinates} from './utils'

class primative extends base{
	/**
	 * Basic primative class - other inherit from here.
	 * @param  {object} inputObject - input object from Data.js
	 * @param  {object} _in - {'X':000,'Y':000} from Mecano state
	 * @param  {int} angle - drawing angle from Mecano state
	 * @param  {object} margin - {'X':000,'Y':000} to avoid overlaps - comes in from Data
	 */
	constructor(inputObject,_in,angle,margin){
		super()
		this.type = 'primative'
		this.name = inputObject.name;
		this.shape = inputObject.shape;
		if (inputObject.kernel){this.kernel = inputObject.kernel}
		this.angle = angle;
		this.start = _in; // never changes
		this.in = {'X':0,'Y':0}; // single insertion point
		this.translation = {'X':0,'Y':0}; // for centering purposes
		this.out = [];
		this.margin = margin // for avoiding overlaps - only X used
		this.padding = {'X':30,'Y':30} // for tag - primative distance - only Y used
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
        this.geometricMidpoint = {'X':0,'Y':0};
        this.tagAnchors = {
        	'top':[],
        	'bottom':[]
        	// can add sides here
        }

        
	}


	/**
	 * Sets the bounding box X and Y coordinates of the entire primative
	 * works for plane and planeStack
	 */
	setBounds(){
		// flattens all
	    var coords = flatten(this.coordinates)
	    // split x and y coordinates
	    const all_x = pullAt(coords, range(0,coords.length,2));
	    const all_y = coords;
	    // find min and max values along each axes
	    this.bounds.min.X = Math.min(...all_x);
	    this.bounds.max.X = Math.max(...all_x);
	    this.bounds.min.Y = Math.min(...all_y);
	    this.bounds.max.Y = Math.max(...all_y);
	}

	/**
	 * Sets the geometric center of the bounding box of the primative
	 */
	setGeometricMidpoint(){
		this.geometricMidpoint.X = parseInt((this.bounds.max.X - this.bounds.min.X)/2, 10) + this.bounds.min.X;
	    this.geometricMidpoint.Y = parseInt((this.bounds.max.Y - this.bounds.min.Y)/2, 10) + this.bounds.min.Y;
	}

	/**
	 * 1. Sets the translation distance to center the primative around the start guide 
	 * 2. Sets the margin distance to avoid any overlaps 
	 * 3. moves the primative by setting the in values
	 * translation.X distance will always be negative
     * translation.Y distance will always be positive
	 */
	move(index){
		// 1.figure out translation
		this.setBounds()
		this.setGeometricMidpoint()
		this.translation.X = this.in.X - this.geometricMidpoint.X;
		this.translation.Y = this.in.Y - this.geometricMidpoint.Y;
		// 2.set
		if (index===0){
			this.in.X = this.start.X + this.translation.X 
			this.in.Y = this.start.Y + this.translation.Y 
		}
		else{
			this.in.X = this.margin.X
			this.in.Y = this.start.Y + this.translation.Y + this.margin.Y			
		}
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

	constructor(inputObject,_in,angle,margin){
		super(inputObject,_in,angle,margin);
		this.stack = 1;
	}

	/**
	 * Sets the out points for the plane primative
	 */
	setOut(){
		// get geometric midpoint after move
		this.setGeometricMidpoint();
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
	draw(index){
		// draw at original
		this.coordinates = getPlaneCoordinates(this)
		// move and calculate new in coords
		this.move(index)
		// draw again to get new coordinates based on new in coords 
		this.coordinates = getPlaneCoordinates(this)
		// draw new bounds
		this.setBounds()
		// set out coords
		this.setOut()
		// push Anchors
		this.setTagAnchors()

	}

}


export class planeStack extends plane{

	constructor(inputObject,_in,angle,margin){
		super(inputObject,_in,angle,margin);
		this.stack = Math.max( Math.floor(this.shape.D3/10) , 2);
		this.stackPadding = 15;
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
		this.setGeometricMidpoint();
		this.out.push({'X':this.geometricMidpoint.X,'Y':this.geometricMidpoint.Y});
		//2// first plane
		this.setPlaneOut(0)
		//3// last plane
		this.setPlaneOut(this.coordinates.length-1)
	}

}