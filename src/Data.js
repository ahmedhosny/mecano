import Mapping from './Mapping'
import {plane,line} from "./components/primatives"

var components = [
    {'name':'siko1','component':'Input2d','size':{'X':100,'Y':100}},
    {'name':'siko2','component':'Input2d','size':{'X':300,'Y':50}}
]

/**
 * Generates a list of entities for Mecano
 * @param  {object} _in - {'X':000,'Y':000} from Mecano state
 * @param  {int} angle - from Mecano state
 * @param  {list} components - from glue layer - ONNX
 * @param  {object} offset - {'X':000,'Y':000} from Mecano state
 * @return {list} - list of entities
 */
export function dataGenerator(_in,angle,offset){
    var Data = []
    // Populate with primatives
    components.map((n,index) => {
        const _primative = Mapping[n.component].primative
        if (index===0){ var _offset = {'X':0 ,'Y':0} }
        else{ _offset = {'X':parseInt(offset.X) + parseInt(Data[index-1].bounds.max.X) ,'Y':0} }
        const component = new _primative(n.name , _in , angle , _offset , n.size)
        component.draw(index)
        Data.push(component)
    });
    // Populate with elastics between primatives
    const elastic = new line()
    elastic.draw(Data[0],Data[1],[1,2,3],[1,2,3])
    // splice
    Data.splice(1, 0, elastic);
    console.log(Data)
    return Data;
}

// better class defs
// show construction for elastics
// component def is not at class level
// primatives different files
// draw structure
// line between two input2d's and which coords to use from each