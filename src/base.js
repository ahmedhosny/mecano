import uuidv4 from 'uuid/v4'


export class base{
	constructor(){
		this.key = uuidv4();
		this.out = [];
		this.coordinates = []; 
	}
}



