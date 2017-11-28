import {components} from './mapping'

import {bottomTag} from "./tag"


/**
 * All primative type new instance: 
 * const component = new primativeClass(inputObject,_in,angle,margin)
 * component.draw(index)
 */

/**
 * All elastic type new instance:
 * const component = new elasticClass(primativeA,primativeB,mappingObject,angle)
 * component.draw()
 */

/**
 * All tag type new instance:
 * const component = new tagClass(host,display)
 * component.draw()
 */


/**
 * input either from user or reading a file..
 * @type {Array}
 */
var input = [
    {'name':'input','component':'Input2d','shape':{'D0':1,'D1':224,'D2':224}},
    {'name':'conv1','component':'Conv2d','shape':{'D0':1,'D1':55,'D2':55,'D3':96},'kernel': {'D1':55,'D2':55}},
    {'name':'conv2','component':'Conv2d','shape':{'D0':1,'D1':55,'D2':55,'D3':256},'kernel': {'D1':20,'D2':20}},
    {'name':'siko3','component':'Pool2d','shape':{'D0':1,'D1':100,'D2':100,'D3':64}},
    {'name':'siko2','component':'Conv2d','shape':{'D0':1,'D1':150,'D2':150,'D3':32},'kernel': {'D1':55,'D2':55}},
    {'name':'siko1','component':'Input2d','shape':{'D0':1,'D1':200,'D2':200}},
    {'name':'siko3','component':'Pool2d','shape':{'D0':1,'D1':100,'D2':100,'D3':64}}
]

/**
 * Generates a list of instances for Mecano
 * @param  {react component} mecano 
 * @return {list} - ordered list of instances
 */
export function dataGenerator(mecano){
    const origin = mecano.state.origin
    const angle = mecano.state.angle
    const margin = mecano.state.margin
    var data = []
    input.forEach((n,index) => {
        //1// margin to prevent overlap  - only in the X direction for nowoffset
        if (index===0){ var _margin = {'X':0 ,'Y':0} }
        else{ _margin = {'X':parseInt(margin.X,10) + parseInt(data[index-1].bounds.max.X,10) ,'Y':0} }
        //2// reshape if needed
        // 
        //3// Make instances with the calculated margin and new shape (if applicable)
        const primativeClass = components[n.component].class
        const component = new primativeClass(n, origin , angle , _margin)
        component.component = n.component
        //4// draw
        component.draw(index)
        //5// Populate with primatives
        data.push(component)
    });
    //6// populate with elastics
    getElastics(data,angle)
    //7// populate with tags
    getTags(data)
    //
    return data;
}

/**
 * Populates data with an elastic between each pair of primatives
 * primative,elastic,primative,elastic...
 * @param  {list} data - data to manipulate
 * @param  {int} angle - from Mecano state
 */
function getElastics(data,angle){
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
                    const component = new elasticClass(originalData[index],originalData[index+1],m,angle)
                    component.component = m.elastic
                    component.draw()
                    data.splice(counter, 0, component);
                    counter += 2
                }
            });
        }
    });
}

/**
 * Adds tags to primatives
 * @param  {list} data - data to manipulate
 */
function getTags(data){
    var originalData = data.slice()
    originalData.forEach((n,index) => {
        if (n.type==='primative'){
            var component = new bottomTag(n,'Shape')
            component.draw()
            component.component = 'Shape'
            data.push(component)
        }
    });
}

//how did it know its bottom tag only
//how did it know its shape to display in bottom tag
//put in mapping, each primative has a list of tags
//best time to reshape