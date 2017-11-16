import {components,links} from './Mapping'
import {line} from "./components/primatives"

var dataIn = [
    {'name':'siko1','component':'Input2d','size':{'X':100,'Y':100}},
    {'name':'siko2','component':'Input2d','size':{'X':200,'Y':200}},
    {'name':'siko3','component':'Input2d','size':{'X':400,'Y':200}}
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
    var data = []
    // Populate with primatives
    dataIn.map((n,index) => {
        const _primative = components[n.component].class
        if (index===0){ var _offset = {'X':0 ,'Y':0} }
        else{ _offset = {'X':parseInt(offset.X) + parseInt(data[index-1].bounds.max.X) ,'Y':0} }
        const component = new _primative(n.name , _in , angle , _offset , n.size)
        component.component = n.component
        component.draw(index)
        data.push(component)
    });
    // populate with elastics
    getElastic(data)
    return data;
}

// better class defs
// show construction for elastics

// primatives different files
// draw structure

// 
// 

function getElastic(data){
    // loop through data
    data.map((n,index) => {
        if (index!==data.length-1){
            var before = n.component
            var after = data[index+1].component
            // loop through elastics
            links.map((m,_index) => {
                if (m.before==before && m.after==after){
                    const _elastic = components[m.elastic].class
                    const component = new _elastic()
                    component.component = m.elastic
                    component.draw(data[index],data[index+1],[1,2,3],[1,2,3])
                    // splice
                    data.splice(index+1, 0, component);
                }
            });
            //console.log(n.component,data[index+1].component)
        }
    });
}