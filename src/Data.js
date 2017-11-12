import Mapping from './Mapping'


var components = [
    {'name':'siko1','type':'Input2d','size':{'X':100,'Y':100}},
    {'name':'siko2','type':'Input2d','size':{'X':50,'Y':50}}
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
    components.map((n,index) => {
        const _primative = Mapping[n.type].primative
        if (index===0){ var _offset = {'X':0 ,'Y':0} }
        else{ _offset = {'X':parseInt(offset.X) + parseInt(Data[index-1].bounds.max.X) ,'Y':0} }
        const component = new _primative(n.name , _in , angle , _offset , n.size)
        component.draw(index)
        Data.push(component)
    });
    // Data is populated
    return Data;
}
