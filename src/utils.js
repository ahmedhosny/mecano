// https://stackoverflow.com/questions/8273047/javascript-function-similar-to-python-range
// works just like python range
export function range(start, stop, step) {
    if (typeof stop === 'undefined') {
        // one param defined
        stop = start;
        start = 0;
    }
    if (typeof step === 'undefined') {
        step = 1;
    }
    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }
    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }
    return result;
};

/**
 * returns the coordinates of a 2d plane
 * @param  {object} instance - the object
 * @return {list} [x1,y1,x2,y2,x3,y3,x4,y4] or [[x1,y1..],[x1,y1..]]
 */
export function getPlaneCoordinates(instance){

    var out = []
    var offset = 0
    for (var i = 0; i < instance.stack ; i++) {
        if (instance.stackPadding){offset = i * instance.stackPadding}
        //
        const p1_x = instance.in.X + offset 
        const p1_y = instance.in.Y
        const p2_x = p1_x  
        const p2_y = p1_y - instance.shape.D2
        //
        const p3_x = p2_x +  parseInt( Math.cos(instance.angle* 0.0174533) * instance.shape.D1 , 10 )
        const p3_y = p2_y - parseInt( Math.sin(instance.angle* 0.0174533) * instance.shape.D1 , 10 )
        const p4_x = p3_x
        const p4_y = p3_y + instance.shape.D2
        //
        out.push([p1_x , p1_y , p2_x , p2_y , p3_x , p3_y , p4_x , p4_y])
    }
    return  out
};

/**
 * Sets the text1 and text2 of BottomTag tag
 * @param {Object} host - host of the tag - a primative
 * @param {Object} instance - instance of bottomTag
 */
export function setBottomTagtext(instance){
    const host = instance.host
    // if shape is displayed
    if (instance.display==='Shape'){
        const multiply = "*"
        const orderedKeys = Object.keys(host.shape).sort()
        const rank = orderedKeys.length
        // check if rank is 3 - if so primative is 2 dimensional.
        if (rank===3){
            instance.text1 = "-"
            instance.text2 = host.shape.D0 + multiply + host.shape.D1 + multiply + host.shape.D2
        }
        else{
            instance.text1 = host.shape[orderedKeys[orderedKeys.length-1]]
            var text2 = host.shape.D0
            orderedKeys.forEach((m,index) => {
                if (index!==0 & index!==rank-1){ text2 += multiply + host.shape[m] }
            });
            instance.text2 = text2
        }
    }
};