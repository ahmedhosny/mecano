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

