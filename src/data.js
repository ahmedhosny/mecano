import {components,links} from './mapping'

var input = [
    {'name':'siko1','component':'Input2d','size':{'X':100,'Y':100}},
    {'name':'siko2','component':'Input2d','size':{'X':200,'Y':200}},
    {'name':'siko3','component':'Input2d','size':{'X':50,'Y':50}}
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
    input.forEach((n,index) => {
        const primativeClass = components[n.component].class
        if (index===0){ var _offset = {'X':0 ,'Y':0} }
        else{ _offset = {'X':parseInt(offset.X,10) + parseInt(data[index-1].bounds.max.X,10) ,'Y':0} }
        const component = new primativeClass(n.name , _in , angle , _offset , n.size)
        component.component = n.component
        component.draw(index)
        data.push(component)
    });
    // populate with elastics
    getElastic(data)
    return data;
}

// better class defs


// draw structure


function getElastic(data){
    // loop through data
    data.forEach((n,index) => {
        if (index!==data.length-1){
            var before = n.component
            var after = data[index+1].component
            // loop through elastics
            links.forEach((m,_index) => {
                if (m.before===before && m.after===after){
                    const elasticClass = components[m.elastic].class
                    const component = new elasticClass()
                    component.component = m.elastic
                    component.draw(data[index],data[index+1],m)
                    // splice
                    data.splice(index+1, 0, component);
                }
            });
        }
    });
}