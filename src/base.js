import uuidv4 from 'uuid/v4'


export class base{
	/**
	 * Base class - takes no arguments
	 */
	constructor(){
		this.key = uuidv4();
		this.coordinates = []; 
	}
}



