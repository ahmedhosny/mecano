import {components} from './mapping'

import {bottomTag} from "./tag"

/**
 * input either from user or reading a file..
 * @type {Array}
 */
var input = [
    {'name':'input','component':'Input2d','size':{'X':224,'Y':224}},
    {'name':'conv1','component':'Conv2d','size':{'X':55,'Y':55,'Z':96,'KX':50,'KY':50}},
    {'name':'conv2','component':'Conv2d','size':{'X':55,'Y':55,'Z':256,'KX':11,'KY':11}},
    {'name':'siko3','component':'Pool2d','size':{'X':100,'Y':100,'Z':64}},
    {'name':'siko2','component':'Conv2d','size':{'X':150,'Y':150,'Z':32,'KX':50,'KY':50}},
    {'name':'siko1','component':'Input2d','size':{'X':200,'Y':200}},
    {'name':'siko3','component':'Pool2d','size':{'X':100,'Y':100,'Z':64}}
]


// var input = [
//     {'name':'input','component':'Input2d','shape':{'D0':1,'D1':224,'D2':224}},
//     {'name':'conv1','component':'Conv2d','shape':{'D0':1,'D1':55,'D2':55,'D3':96},'kernel': {'D1':55,'D2':55}},
//     {'name':'conv2','component':'Conv2d','shape':{'D0':1,'D1':55,'D2':55,'D3':256},'kernel': {'D1':55,'D2':55}},
//     {'name':'siko3','component':'Pool2d','shape':{'D0':1,'D1':100,'D2':100,'D3':64}},
//     {'name':'siko2','component':'Conv2d','shape':{'D0':1,'D1':150,'D2':150,'D3':32},'kernel': {'D1':55,'D2':55}},
//     {'name':'siko1','component':'Input2d','shape':{'D0':1,'D1':200,'D2':200}},
//     {'name':'siko3','component':'Pool2d','shape':{'D0':1,'D1':100,'D2':100,'D3':64}}
// ]

/**
 * All primative class new instance: 
 * const component = new primativeClass(inputObject , in , angle , margin)
 * component.draw(index)
 */

/**
 * All elastics class new instance:
 * const component = new elasticClass()
 * component.draw(before,after,m,angle)
 */

/**
 * Generates a list of instances for Mecano
 * @param  {object} _in - {'X':000,'Y':000} from Mecano state
 * @param  {int} angle - from Mecano state
 * @param  {object} margin - {'X':000,'Y':000} from Mecano state
 * @return {list} - ordered list of instances
 */
export function dataGenerator(_in,angle,margin){
    var data = []
    input.forEach((n,index) => {
        //1// margin to prevent overlap  - only in the X direction for nowoffset
        if (index===0){ var _margin = {'X':0 ,'Y':0} }
        else{ _margin = {'X':parseInt(margin.X,10) + parseInt(data[index-1].bounds.max.X,10) ,'Y':0} }
        //2// resize if needed
        //
        //3// Make instances with the calculated margin and new size (if applicable)
        const primativeClass = components[n.component].class
        const component = new primativeClass(n, _in , angle , _margin)
        component.component = n.component
        //4// draw
        component.draw(index)
        //5// Populate with primatives
        data.push(component)
    });
    //6// populate with elastics
    getElastic(data,angle)

    //tag test area
    var test = new bottomTag(data[6])
    test.draw()
    test.component = 'Size'
    data.push(test)
    var test = new bottomTag(data[4])
    test.draw()
    test.component = 'Size'
    data.push(test)
    var test = new bottomTag(data[2])
    test.draw()
    test.component = 'Size'
    data.push(test)
    var test = new bottomTag(data[0])
    test.draw()
    test.component = 'Size'
    data.push(test)
    return data;
}

/**
 * Populates data with an elastic between each pair of primatives
 * primative,elastic,primative,elastic...
 * @param  {list} data - data to manipulate
 * @param  {int} angle - from Mecano state
 */
function getElastic(data,angle){
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
                    component.draw(originalData[index],originalData[index+1],m,angle)
                    data.splice(counter, 0, component);
                    counter += 2
                }
            });
        }
    });
}
