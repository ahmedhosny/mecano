// components (primatives)
import Input2d from './components/Input2d'
import Pool2d from './components/Pool2d'
import Conv2d from './components/Conv2d'
// components (elastics)
import Tracer from './components/Tracer'
import Kernel from './components/Kernel'
// components (tags)
import Size from './components/Size'
// primative classes
import {plane,planeStack} from "./primatives"
// elastic classes
import {line,pyramid} from "./elastics"
// tag classes
import {bottomTag} from "./tags"

/**
 * Object that maps the react components with the classes that make them
 */
export const components={ 
	// primatives
    'Input2d':{
        'component':Input2d,
        'class':plane,
		'after':[
        	{
	        'after':'Input2d',
	        'beforeOut':[1,2,3],
	        'afterOut':[1,2,3],
	        'elastic':'Tracer'
        	},
        	{
	        'after':'Conv2d',
	        'beforeOut': [0],
	        'afterOut': [1],
	        'elastic':'Kernel'
        	},
        	{
	        'after':'Pool2d',
	        'beforeOut':[1,2,3],
	        'afterOut':[2,3,4],
	        'elastic':'Tracer'
        	}
        ]
    },
    'Conv2d':{
        'component':Conv2d,
        'class':planeStack,
		'after':[
        	{
	        'after':'Conv2d',
	        'beforeOut':[5],
	        'afterOut':[1],
	        'elastic':'Kernel'
        	},
        	{
	        'after':'Input2d',
	        'beforeOut':[6,7,8],
	        'afterOut':[1,2,3],
	        'elastic':'Tracer'
        	},
        	{
	        'after':'Pool2d',
	        'beforeOut':[6,7,8],
	        'afterOut':[2,3,4],
	        'elastic':'Tracer'
        	}
        ]
    },
    'Pool2d':{
        'component':Pool2d,
        'class':planeStack,
        'after':[
        	{
	        'after':'Pool2d',
	        'beforeOut':[6,7,8],
	        'afterOut':[2,3,4],
	        'elastic':'Tracer'
        	},
        	{
	        'after':'Conv2d',
	        'beforeOut':[5],
	        'afterOut':[1],
	        'elastic':'Kernel'
        	},
        	{
	        'after':'Input2d',
	        'beforeOut':[6,7,8],
	        'afterOut':[1,2,3],
	        'elastic':'Tracer'
        	}
        ]
    },
    // elastics
    'Tracer':{
    	'component':Tracer,
    	'class':line
    },
    'Kernel':{
    	'component':Kernel,
    	'class':pyramid
    },
    // tags
    'Size':{
        'component':Size,
        'class':bottomTag
    }
}
