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
import {plane,planeStack} from "./classes/primative"
// elastic 
import {line,pyramid} from "./classes/elastic"
// tag 
import {bottomTag,topTag} from "./classes/tag"

/**
 * Object that maps the react components with the classes that make them
 */
export const components={ 
	// primatives:
    'Input2d':{
        'class':plane,
        'component':Input2d,
		'target':[
        	{
	        'target':'Input2d',
	        'sourceOut':[1,2,3],
	        'targetOut':[1,2,3],
	        'elastic':'Funnel'
        	},
        	{
	        'target':'Conv2d',
	        'sourceOut': [0],
	        'targetOut': [1],
	        'elastic':'Kernel'
        	},
        	{
	        'target':'Pool2d',
	        'sourceOut':[1,2,3],
	        'targetOut':[2,3,4],
	        'elastic':'Funnel'
        	}
        ]
    },
    'Conv2d':{
        'class':planeStack,
        'component':Conv2d,
		'target':[
        	{
	        'target':'Conv2d',
	        'sourceOut':[5],
	        'targetOut':[1],
	        'elastic':'Kernel'
        	},
        	{
	        'target':'Input2d',
	        'sourceOut':[6,7,8],
	        'targetOut':[1,2,3],
	        'elastic':'Funnel'
        	},
        	{
	        'target':'Pool2d',
	        'sourceOut':[6,7,8],
	        'targetOut':[2,3,4],
	        'elastic':'Funnel'
        	}
        ]
    },
    'Pool2d':{
        'class':planeStack,
        'component':Pool2d,
        'target':[
        	{
	        'target':'Pool2d',
	        'sourceOut':[6,7,8],
	        'targetOut':[2,3,4],
	        'elastic':'Funnel'
        	},
        	{
	        'target':'Conv2d',
	        'sourceOut':[5],
	        'targetOut':[1],
	        'elastic':'Kernel'
        	},
        	{
	        'target':'Input2d',
	        'sourceOut':[6,7,8],
	        'targetOut':[1,2,3],
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
