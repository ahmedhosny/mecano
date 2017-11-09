// calculates x and y coordinates of all 4 points - starting from bottom left and in 
// clockwise direction




// calculates x and y coordinates of all 4 points - starting from bottom left and in 
// clockwise direction
export function getRectangleCoordinates(entity, duplicate, angle, duplicateOffset = 0){
    // takes care of duplicates
    var offset = duplicate * duplicateOffset
    //
    const p1_x = entity.in.X + offset 
    const p1_y = entity.in.Y
    const p2_x = p1_x  
    const p2_y = p1_y - entity.size.Y
    //
    const p3_x = p2_x +  parseInt( Math.cos(angle* 0.0174533) * entity.size.X , 10 )
    const p3_y = p2_y - parseInt( Math.sin(angle* 0.0174533) * entity.size.X , 10 )
    const p4_x = p3_x
    const p4_y = p3_y + entity.size.Y
    //
    console.log("image2d drawn the first time")
    return [p1_x , p1_y , p2_x , p2_y , p3_x , p3_y , p4_x , p4_y] 
};

