import {getRectangleCoordinates} from './DrawUtils.js'
import {flatten,pullAt} from 'lodash';

// _this is input2d react component
export function updateMecano(_this){

	var newItems = []
	var oldData = _this.state.data
	// loop through all entities in this.state.data
	{oldData.ids.map((m,index) => {
			var n = oldData.items.find(function (obj) { return obj.key === m; });

			//1// calculate translation to center around 
			var coords = getRectangleCoordinates(n,0,_this.state.angle)
			var bounds = getBounds(coords)	
			var translation = getTranslation(bounds,n.in.X,n.in.Y)

			//2// newIn - now drawing inout2d id ok
			// must reset in X and Y everytime
			var newIn = {
					'X':_this.state.startX + translation[0],
					'Y':_this.state.startY + translation[1]
			    }

			if (index!=0){
		    	newIn.X = newItems[index-1].bounds.max.X + parseInt(_this.state.buffer)
			}


		    //3// make a new entity with newIn
		    var updateEntity = (obj, newIn) => ({
				...obj,
				in: newIn,
			})

			//4// get the coords,bounds and translation based on newIn
			var intermediateEntity = updateEntity(n, newIn)
			var coords = getRectangleCoordinates(intermediateEntity,0,_this.state.angle)
			var bounds = getBounds(coords)	
			var translation = getTranslation(bounds,intermediateEntity.in.X,intermediateEntity.in.Y)		

			//5// update newBounds and newOut
		    const newBounds ={
			    'min':{
		            'X':bounds[0] ,
		            'Y':bounds[2] 
		        },
		        'max':{
		            'X':bounds[1] ,
		            'Y':bounds[3] 
		        }
		    }
		    const newOut = [
				{'X':newIn.X,
				'Y':newIn.Y}
				]

		    //6// make new entity with newIn, bounds, and out
		    var updateEntity = (obj, newIn,newBounds,newOut) => ({
				...obj,
				in: newIn,
				bounds: newBounds,
				out: newOut
			})

		    //7// add to list 
			newItems.push(updateEntity(n, newIn,newBounds,newOut))

	    })
	}


	// after the loop, newItems is fully populated
	// set state
	var newData = {'ids':_this.state.data.ids,'items':newItems}
	_this.setState({
		// angle, construction..etc
		..._this.state,
		data: newData
	})



}









////////////////////////////////////////////////////////////////////////
//////helpers



// https://stackoverflow.com/questions/8273047/javascript-function-similar-to-python-range
// works just like python range
export function range(start, stop, step) {
    if (typeof stop === 'undefined') {
        // one param defined
        stop = start;
        start = 0;
    }
    if (typeof step === 'undefined') {
        step = 1;
    }
    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }
    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }
    return result;
};



// get bounding box minimums and maximums at X and Y
export function getBounds(coordinates){
    const flatCoordinates = flatten(coordinates)
    // split x and y coordinates
    const all_x = pullAt(flatCoordinates, range(0,flatCoordinates.length,2));
    const all_y = flatCoordinates;
    // find min and max values along each axes
    const min_x = Math.min(...all_x),
        max_x = Math.max(...all_x),   
        min_y = Math.min(...all_y),
        max_y = Math.max(...all_y);
    
    return [min_x , max_x, min_y , max_y]
}

// this function takes as input a list of coordinates [x,y,x,y...]
// it first finds the bounding box and its center
// then the distance to translate to the component center construction point
// assumes that bounding box midpoint is always in the first quadrant relative to the center construction point
export function getTranslation(bounds,center_x,center_y){
    const midpoint_x = parseInt((bounds[1] - bounds[0])/2, 10) + bounds[0],
        midpoint_y = parseInt((bounds[3] - bounds[2])/2, 10) + bounds[2];
    // return translation distances
    // x distance will always be negative
    // y distance will always be positive
    return [center_x - midpoint_x, center_y - midpoint_y]
}