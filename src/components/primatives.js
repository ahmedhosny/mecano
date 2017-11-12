import uuidv4 from 'uuid/v4'
import {flatten,pullAt} from 'lodash';
import {range,getPlaneCoordinates} from './Helpers'


class primative{
	/**
	 * Base primative class - other inherit from here.
	 * @param  {string} name - primative name
	 * @param  {object} _in - {'X':000,'Y':000} from Mecano state
	 * @param  {int} angle - drawing angle from Mecano state
	 * @param  {object} offset - {'X':000,'Y':000} to avoid overlaps - comes in from Data
	 */
	constructor(name,_in,angle,offset){
		this.name = name;
		this.angle = angle;
		this.key = uuidv4();
		this.start = _in; // never changes
		this.in = {'X':0,'Y':0};
		this.out = [{'X':0,'Y':0}];
		this.translation = {'X':0,'Y':0}; // for centering purposes
		this.offset = offset // for avoiding overlaps
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
        this.coordinates = []; // either [x1,y1,x2,y2,x3,y3,x4,y4] or [[x1,y1..],[x1,y1..]]
	}


	/**
	 * Sets the bounding box X and Y coordinates of the entire primative
	 */
	setBounds(){
	    const flatCoordinates = flatten(this.coordinates);
	    // split x and y coordinates
	    const all_x = pullAt(flatCoordinates, range(0,flatCoordinates.length,2));
	    const all_y = flatCoordinates;
	    // find min and max values along each axes
	    this.bounds.min.X = Math.min(...all_x);
	    this.bounds.max.X = Math.max(...all_x);
	    this.bounds.min.Y = Math.min(...all_y);
	    this.bounds.max.Y = Math.max(...all_y);
	}

	/**
	 * Sets the gemeotic center of the bounding box of the primative
	 */
	setGeometricMidpoint(){
		this.geometricMidpoint.X = parseInt((this.bounds.max.X - this.bounds.min.X)/2, 10) + this.bounds.min.X;
	    this.geometricMidpoint.Y = parseInt((this.bounds.max.Y - this.bounds.min.Y)/2, 10) + this.bounds.min.Y;
	}

	/**
	 * 1. Sets the translation distance to center the primative around the start guide 
	 * 2. Sets the offset distance to avoid any overlaps 
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
		// 3.set
		if (index==0){
			this.in.X = this.start.X + this.translation.X 
			this.in.Y = this.start.Y + this.translation.Y 
		}
		else{
			this.in.X = this.offset.X
			this.in.Y = this.start.Y + this.translation.Y + this.offset.Y			
		}
	}

}


export class plane extends primative{

	/**
	 * The plane primative
	 * @param  {string} name - primative name
	 * @param  {object} _in - {'X':000,'Y':000} from Mecano state
	 * @param  {int} angle - drawing angle from Mecano state
	 * @param  {object} offset - {'X':000,'Y':000} to avoid overlaps - comes in from Data
	 * @param  {object} size of the plane - {'X':000,'Y':000}
	 */
	constructor(name,_in,angle,offset,size){
		super(name,_in,angle,offset);
		this.size = size;
		this.duplicate = 0;
		this.type = 'Input2d'
	}

	/**
	 * Sets the out points for the plane primative
	 */
	setOut(){
		// reset 
		this.out = [];
		// get geometric midpoint after move
		this.setGeometricMidpoint();
		// push midpoint
		this.out.push({'X':this.geometricMidpoint.X,'Y':this.geometricMidpoint.Y});
		// push specifc coords
		const idxs = [0,1,2];
		idxs.map((idx) => {
			this.out.push({'X':this.coordinates[idx*2],'Y':this.coordinates[idx*2+1]});
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
	}

}

