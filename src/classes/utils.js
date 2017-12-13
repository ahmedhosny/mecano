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
 * Sets the bounding box dims by getting the min and max in both axes
 * @param {list} allX - list of all X coords
 * @param {list} allY - list of all Y coords
 * @param {object} obj - object to set its bounds
 */
export function setBounds(allX,allY,obj){
    // find min and max values along each axes
    obj.bounds.min.X = Math.min(...allX);
    obj.bounds.max.X = Math.max(...allX);
    obj.bounds.min.Y = Math.min(...allY);
    obj.bounds.max.Y = Math.max(...allY);
}

/**
 * Sets mecano bounds
 * @param {list} data - list of primatives 
 * @param  {react component} mecano
 */
export function setMecanoBounds(data, mecano){
    var allX = [];
    var allY = [];
    data.forEach((m,index) => {
        allX.push(m.bounds.min.X,m.bounds.max.X)
        allY.push(m.bounds.min.Y,m.bounds.max.Y)
    });
    setBounds(allX,allY,mecano.state)
}

// 1. thinking of moving all the functions in utils.js as static methods in primative/elastic/tag. What do you think?
// This way I can call them by calling the class itself rather than an instance of the class
// 2. I see set and get methods
// 3. what kind of unit tests can i use?
// 4. what do you think of the css solution that I have/ no individual css files - I just have theme.js
// generally if you see stuff that is not consistent like variable naming or the use of var/const/let - just point it out and i will fix
// what do you use to clean javascript, like spaces, linebreaks, ; at the end of each line, "" VS '' ....etc