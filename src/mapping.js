//
// COMPONENTS
// 
// primative
import Input2d from './components/Input2d'
import Pool2d from './components/Pool2d'
import Conv2d from './components/Conv2d'
// elastic
import Funnel from './components/Funnel'
import Kernel from './components/Kernel'
// tag
import Shape from './components/Shape'
import Name from './components/Name'
//
// CLASSES
// 
// primative 
import {plane,planeStack} from "./primative"
// elastic 
import {line,pyramid} from "./elastic"
// tag 
import {bottomTag,topTag} from "./tag"

/**
 * Object that maps the react components with the classes that make them
 */
export const components={ 
	// primatives:
    'Input2d':{
        'class':plane,
        'component':Input2d,
		'after':[
        	{
	        'after':'Input2d',
	        'beforeOut':[1,2,3],
	        'afterOut':[1,2,3],
	        'elastic':'Funnel'
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
	        'elastic':'Funnel'
        	}
        ]
    },
    'Conv2d':{
        'class':planeStack,
        'component':Conv2d,
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
	        'elastic':'Funnel'
        	},
        	{
	        'after':'Pool2d',
	        'beforeOut':[6,7,8],
	        'afterOut':[2,3,4],
	        'elastic':'Funnel'
        	}
        ]
    },
    'Pool2d':{
        'class':planeStack,
        'component':Pool2d,
        'after':[
        	{
	        'after':'Pool2d',
	        'beforeOut':[6,7,8],
	        'afterOut':[2,3,4],
	        'elastic':'Funnel'
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
	        'elastic':'Funnel'
        	}
        ]
    },

    // elastics:
    'Funnel':{
        'class':line,
    	'component':Funnel
    },
    'Kernel':{
        'class':pyramid,
    	'component':Kernel
    },

    // tags:
    'Shape':{
        'class':bottomTag,
        'component':Shape
    },
    'Name':{
        'class':topTag,
        'component':Name
    }
}
