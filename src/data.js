
import {setMecanoBounds} from './classes/utils'
import {graph} from './classes/graph'


// /**
//  * input either from user or reading a file..
//  * @type {Array}
//  */
// var input = [
//     {'name':'someName','component':'Input2d','shape':{'D0':1,'D1':224,'D2':224},'params':{}},
//     {'name':'name1','component':'Conv2d','shape':{'D0':1,'D1':55,'D2':55,'D3':96},'params':{'kernel': {'D1':55,'D2':55}}},
//     {'name':'name2','component':'Conv2d','shape':{'D0':1,'D1':55,'D2':55,'D3':256},'params':{'kernel': {'D1':30,'D2':30}}},
//     {'name':'siko3','component':'Pool2d','shape':{'D0':1,'D1':100,'D2':100,'D3':64},'params':{}},
//     {'name':'siko2','component':'Conv2d','shape':{'D0':1,'D1':150,'D2':150,'D3':32},'params':{'kernel': {'D1':55,'D2':55}}},
//     {'name':'siko1','component':'Input2d','shape':{'D0':1,'D1':200,'D2':200},'params':{}},
//     {'name':'siko4','component':'Pool2d','shape':{'D0':1,'D1':100,'D2':100,'D3':64},'params':{}}
// ]


var inputData = {
    'user': 'ahmed',
    'version': '0.0.1',
    'name': 'my_first_mecano',
    'root': [
        'b89216bc-7f3f-43b8-9e6c-29f4a752f347'
    ],
    'nodes': [
        {
            'key': 'b89216bc-7f3f-43b8-9e6c-29f4a752f347',
            'name':'someName',
            'component':'Input2d',
            'shape':{
                'D0':1,
                'D1':224,
                'D2':224
            },
            'params':{
            }
        },
        {
            'key':'40fa28ec-d6d1-4f99-ac3e-b60735d13378',
            'name':'name1',
            'component':'Conv2d',
            'shape':{
                'D0':1,
                'D1':55,
                'D2':55,
                'D3':96
            },
            'params':{
                'kernel': {
                    'D1':55,
                    'D2':55
                }
            }
        },
        {
            'key':'b0c411f8-a9ef-4170-8182-addd83553ae8',
            'name':'name2',
            'component':'Conv2d',
            'shape':{
                'D0':1,
                'D1':55,
                'D2':55,
                'D3':96
            },
            'params':{
                'kernel': {
                    'D1':55,
                    'D2':55
                }
            }
        }
    ],
    'edges': [
        {
            'source': 'b89216bc-7f3f-43b8-9e6c-29f4a752f347',
            'target': '40fa28ec-d6d1-4f99-ac3e-b60735d13378'
        },
        {
            'source': '40fa28ec-d6d1-4f99-ac3e-b60735d13378',
            'target': 'b0c411f8-a9ef-4170-8182-addd83553ae8'
        }
    ]
}


export function dataGenerator(mecano){

    //1// build graph from input data
    var _graph = new graph(inputData,mecano)
    //3// set all to not visited
    var outputData = _graph.traverse()



    // const data = graphCrawler(inputData,mecano)
    // // var data = [];
    // // graphCrawler(inputData,mecano)
    // // //1// populate with primatives
    // // getPrimatives(data,mecano);
    // //2// set mecano state
    // var outputData = crawl(inputData,mecano)
    setMecanoBounds(outputData,mecano)
    // //2// populate with elastics
    // getElastics(data,mecano);
    // //3// populate with tags
    // getTags(data,mecano);
    //
    
    return outputData;
}




// function getPrimative(node,mecano){
//     const state = mecano.state
//     const primativeClass = components[node.component].class;
//     const primative = new primativeClass(
//         node.shape,
//         state.angle,
//         node.position,
//         {  
//             name : node.name, 
//             params : node.params,
//             padding : state.padding
//         }
//     )
//     primative.component = node.component;
//     primative.key = node.key;
//     primative.draw();
//     return primative;
// }


// function crawl(inputData,mecano){



//     var outputData = []
//     // loop through start to get firstNodes
//     inputData.root.forEach((j,index) => {
//         const firstNodes = inputData.nodes.filter(function( object ) {
//             return object.key === j;
//         });
//         // loop through firstNodes
//         firstNodes.forEach((k,index) => {
//             //1// draw it
//             outputData.push(getPrimative(k,mecano))

            

//             //2// get list where k is a source
//             const nextEdges = inputData.edges.filter(function( object ) {
//                 return object.source === k.key;
//             });
//             // loop through next edges
//             nextEdges.forEach((l,index) => {
//             // get nodes at the en dof these edges
//                 const nextNodes = inputData.nodes.filter(function( object ) {
//                     return object.key === l.target;
//                 }); 
//                 // loop through next nodes
//                 nextNodes.forEach((m,index) => {
//                     outputData.push(getPrimative(m,mecano))
//                 });
//             });
//         });
//     });
//     return outputData;
// }






// ///////////////////////////////// OLD SHIT

// function getPrimative(node,index,mecano,primativeList){
//         //1// margin to prevent overlap  - only in the X direction for nowoffset
//         if (index===0){ var _margin = {'X':0 ,'Y':0} }
//         else{ _margin = {'X':parseInt(mecano.state.margin.X,10) + parseInt(primativeList[index-1].bounds.max.X,10) ,'Y':0} }
//         //2// reshape if needed
//         // 
//         //3// Make instances with the calculated margin and new shape (if applicable)
//         const state = mecano.state
//         const primativeClass = components[node.component].class;
//         const primative = new primativeClass(
//             node.shape,
//             state.angle,
//             state.origin,
//             {  
//                 name : node.name, 
//                 params : node.params,
//                 padding : state.padding,
//                 margin : _margin
//             }
//         )
//         primative.component = node.component;
//         primative.key = node.id;
//         //4// draw
//         primative.draw();
//         primativeList.push(primative)
//         return primative
// }


// function graphCrawler(inputData,mecano){
//     var primativeList = []
//     var outputData = []
//     // loop through nodes
//     inputData.nodes.forEach((node,index) => {
//         // push primative
//         outputData.push( getPrimative(node,index,mecano,primativeList) )
//     })
//     return outputData

// }






// /**
//  * Adds primatives to the empty data list
//  * @param  {list} data - data to add to
//  * @param  {react component} mecano 
//  */
// function getPrimatives(data,mecano){
//     input.forEach((n,index) => {
//         //1// margin to prevent overlap  - only in the X direction for nowoffset
//         if (index===0){ var _margin = {'X':0 ,'Y':0} }
//         else{ _margin = {'X':parseInt(mecano.state.margin.X,10) + parseInt(data[index-1].bounds.max.X,10) ,'Y':0} }
//         //2// reshape if needed
//         // 
//         //3// Make instances with the calculated margin and new shape (if applicable)
//         const state = mecano.state
//         const primativeClass = components[n.component].class;
//         const component = new primativeClass(
//             n.shape,
//             state.angle,
//             state.origin,
//             {  
//                 name : n.name, 
//                 params : n.params,
//                 padding : state.padding,
//                 margin : _margin
//             }
//         )
//         component.component = n.component;
//         //4// draw
//         component.draw(index);
//         //5// Populate with primatives
//         data.push(component);
//     });
// }

// /**
//  * Populates data with an elastic between each pair of primatives
//  * primative,elastic,primative,elastic...
//  * @param  {list} data - data to manipulate
//  * @param  {react component} mecano 
//  */
// function getElastics(data,mecano){
//     var originalData = data.slice();
//     // loop through data
//     var counter = 1;
//     originalData.forEach((n,index) => {
//         if (index!==originalData.length-1){
//             // get _from and to components
//             var _from = n.component
//             var to = originalData[index+1].component
//             // loop through the "to" options
//             components[_from].to.forEach((m,_index) => {
//                 if (m.to===to){
//                     const elasticClass = components[m.elastic].class
//                     const component = new elasticClass(
//                         at(originalData[index].out,m.fromOut),
//                         at(originalData[index+1].out,m.toOut),
//                         {
//                             angle : mecano.state.angle,
//                             paramsFrom : originalData[index].params,
//                             paramsTo : originalData[index+1].params
//                         }
//                     )
//                     component.component = m.elastic
//                     component.draw()
//                     data.splice(counter, 0, component);
//                     counter += 2
//                 }
//             });
//         }
//     });
// }


// /**
//  * Adds tags to primatives
//  * @param  {list} data - data to manipulate
//  */
// function getTags(data,mecano){
//     var originalData = data.slice()
//     originalData.forEach((n,index) => {
//         if (n.type==='primative'){
//             // loop through available tags
//             n.tags.forEach((m,index) => {
//                 var tagClass = components[m.component].class // m.component is 'shape' , class is Shape , class is bottomTag
//                 var component = new tagClass(
//                     m,
//                     n.tagAnchors
//                 )
//                 component.draw()
//                 component.component = m.component
//                 data.push(component)
//             });
//         }
//     });
// }

