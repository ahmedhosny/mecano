import {components} from './mapping'
import {setMecanoBounds} from './utils'


/**
 * input either from user or reading a file..
 * @type {Array}
 */
var input = [
    {'name':'input','component':'Input2d','shape':{'D0':1,'D1':224,'D2':224},'params':{}},
    {'name':'conv1','component':'Conv2d','shape':{'D0':1,'D1':55,'D2':55,'D3':96},'params':{'kernel': {'D1':55,'D2':55}}},
    {'name':'conv2','component':'Conv2d','shape':{'D0':1,'D1':55,'D2':55,'D3':256},'params':{'kernel': {'D1':30,'D2':30}}},
    {'name':'siko3','component':'Pool2d','shape':{'D0':1,'D1':100,'D2':100,'D3':64},'params':{}},
    {'name':'siko2','component':'Conv2d','shape':{'D0':1,'D1':150,'D2':150,'D3':32},'params':{'kernel': {'D1':55,'D2':55}}},
    {'name':'siko1','component':'Input2d','shape':{'D0':1,'D1':200,'D2':200},'params':{}},
    {'name':'siko3','component':'Pool2d','shape':{'D0':1,'D1':100,'D2':100,'D3':64},'params':{}}
]

/**
 * Generates a list of instances for Mecano
 * @param  {react component} mecano 
 * @return {list} - ordered list of instances
 */
export function dataGenerator(mecano){
    var data = [];
    //1// populate with primatives
    getPrimatives(data,mecano);
    //2// set mecano state
    setMecanoBounds(data,mecano)
    //2// populate with elastics
    getElastics(data,mecano);
    //3// populate with tags
    getTags(data,mecano);
    //
    return data;
}


/**
 * Adds primatives to the empty data list
 * @param  {list} data - data to add to
 * @param  {react component} mecano 
 */
function getPrimatives(data,mecano){
    input.forEach((n,index) => {
        //1// margin to prevent overlap  - only in the X direction for nowoffset
        if (index===0){ var _margin = {'X':0 ,'Y':0} }
        else{ _margin = {'X':parseInt(mecano.state.margin.X,10) + parseInt(data[index-1].bounds.max.X,10) ,'Y':0} }
        //2// reshape if needed
        // 
        //3// Make instances with the calculated margin and new shape (if applicable)
        const state = mecano.state
        const primativeClass = components[n.component].class;
        const component = new primativeClass(n.name,    
                                            n.shape,
                                            n.params,
                                            state.angle,
                                            state.origin,
                                            state.padding,
                                            _margin);
        component.component = n.component;
        //4// draw
        component.draw(index);
        //5// Populate with primatives
        data.push(component);
    });
}

/**
 * Populates data with an elastic between each pair of primatives
 * primative,elastic,primative,elastic...
 * @param  {list} data - data to manipulate
 * @param  {react component} mecano 
 */
function getElastics(data,mecano){
    var originalData = data.slice();
    // loop through data
    var counter = 1;
    originalData.forEach((n,index) => {
        if (index!==originalData.length-1){
            // get before and after components
            var before = n.component
            var after = originalData[index+1].component
            // loop through the "after" options
            components[before].after.forEach((m,_index) => {
                if (m.after===after){
                    const elasticClass = components[m.elastic].class
                    const component = new elasticClass(originalData[index],originalData[index+1],m,mecano)
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
function getTags(data,mecano){
    var originalData = data.slice()
    originalData.forEach((n,index) => {
        if (n.type==='primative'){
            // loop through available tags
            n.tags.forEach((m,index) => {
                var tagClass = components[m.component].class
                var component = new tagClass(n,m.component,mecano)
                component.draw()
                component.component = m.component
                data.push(component)
            });
        }
    });
}

