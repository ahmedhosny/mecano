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
 * returns the coordinates of a plane
 * @param  {object} entity - the object
 * @param  {int} duplicate - 0=plane, >0=planeStack
 * @param  {int} angle - skew angle
 * @param  {float} duplicateOffset - 
 * @return {list} [x1,y1,x2,y2,x3,y3,x4,y4] or [[x1,y1..],[x1,y1..]]
 */
export function getPlaneCoordinates(entity, duplicateOffset = 0){
    // takes care of duplicates
    var offset = entity.duplicate * duplicateOffset
    //
    const p1_x = entity.in.X + offset 
    const p1_y = entity.in.Y
    const p2_x = p1_x  
    const p2_y = p1_y - entity.size.Y
    //
    const p3_x = p2_x +  parseInt( Math.cos(entity.angle* 0.0174533) * entity.size.X , 10 )
    const p3_y = p2_y - parseInt( Math.sin(entity.angle* 0.0174533) * entity.size.X , 10 )
    const p4_x = p3_x
    const p4_y = p3_y + entity.size.Y
    //
    return [p1_x , p1_y , p2_x , p2_y , p3_x , p3_y , p4_x , p4_y] 
};