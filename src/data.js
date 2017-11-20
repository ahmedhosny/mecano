import {components} from './mapping'

/**
 * input either from user or reading a file..
 * @type {Array}
 */
var input = [
    {'name':'siko1','component':'Input2d','size':{'X':200,'Y':200}},
        {'name':'siko1','component':'Input2d','size':{'X':200,'Y':200}},
    {'name':'siko2','component':'Conv2d','size':{'X':150,'Y':150,'Z':32}},
        {'name':'siko2','component':'Conv2d','size':{'X':150,'Y':150,'Z':32}},
    {'name':'siko3','component':'Pool2d','size':{'X':100,'Y':100,'Z':64}},
        {'name':'siko3','component':'Pool2d','size':{'X':100,'Y':100,'Z':64}},
        {'name':'siko2','component':'Conv2d','size':{'X':150,'Y':150,'Z':32}},
        {'name':'siko1','component':'Input2d','size':{'X':200,'Y':200}},
        {'name':'siko3','component':'Pool2d','size':{'X':100,'Y':100,'Z':64}}

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
    var originalData = data.slice()
    // loop through data
    var counter = 1
    originalData.forEach((n,index) => {
        if (index!==originalData.length-1){
            // get before and after components
            var before = n.component
            var after = originalData[index+1].component
            // loop through the "after" options
            components[before].after.forEach((m,_index) => {
                if (m.after===after){
                    const elasticClass = components[m.elastic].class
                    const component = new elasticClass()
                    component.component = m.elastic
                    component.draw(originalData[index],originalData[index+1],m)
                    data.splice(counter, 0, component);
                    counter += 2
                }
            });
        }
    });
}
