import Input2d from './components/Input2d'
import Tracer from './components/Tracer'
import {plane,line} from "./components/primatives"


const Mapping={
    'Input2d':{
        'component':Input2d,
        'primative':plane
    },
    'Tracer':{
    	'component':Tracer,
    	'primative':line
    }
}

export default Mapping;