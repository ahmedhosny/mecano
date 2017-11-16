import Input2d from './components/Input2d'
import Tracer from './components/Tracer'
import {plane,line} from "./components/primatives"

/**
 * Object that maps the react components with the classes that make them
 */
export const components={ 
	// primatives
    'Input2d':{
        'component':Input2d,
        'class':plane
    },
    // elastics
    'Tracer':{
    	'component':Tracer,
    	'class':line
    }
}
/**
 * List that contains the elastics that come in between all the different primatives
 * Elastics span the out points whose indicies are recorded here
 */
export const links=[
    {
        'before':'Input2d',
        'beforeOut':[1,2,3],
        'after':'Input2d',
        'afterOut':[1,2,3],
        'elastic':'Tracer'
    }
]