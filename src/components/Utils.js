













////////////////////////////////////////////////////////////////////////////////
// this function figures out the updates to bounds, in and out.
// export function updateComponents(_this){
//     const data = _this.state.data
//     const angle = _this.props.angle

//     data.map((n,index) => {
//         // if image
//         if (n.type==='Input2d'){

//             // update coords
//             const coords = getRectCoords(n.in.X,n.in.Y,n.size.X,n.size.Y,angle);
//             // // get bounds
//             // const min_max = getBounds(coords);
//             // // apply translation (Y only)
//             // const translation = getTranslation(coords,n.in.X,n.in.Y);
//             // // get inX
//             // var inX = 0;
//             // if (index===0){
//             //     inX = thes.state.startX
//             // }
//             // else{
//             //     inX = data[index-1].bounds.max.X + thes.props.buffer
//             // }
//             // // update
//             // thes.setState( (prevState) => update(prevState, 
//             //     {data: 
//             //         {[index]: 
//             //             {bounds: 
//             //                 {min: {X: {$set: min_max[0] }} , {Y: {$set: min_max[2]+translation[1] }} },
//             //                 {max: {X: {$set: min_max[1] }} , {Y: {$set: min_max[3]+translation[1] }} }
//             //             },
//             //             {in:
//             //                 {X: {$set: inX}},
//             //                 {Y: {$set: thes.props.Y}}
//             //             }
//             //             {out:
//             //                 {0:
//             //                     {X: {$set: n.in.X}},
//             //                     {Y: {$set: n.in.Y}}
//             //                 }
//             //             }
//             //         } 
//             //     }));
//         }
//         return(
//             "hi"
//         )
//     })
// }




// calculates x and y coordinates of all 4 points - starting from bottom left and in 
// clockwise direction
// export function getRectCoords(inX,inY,sizeX,sizeY,angle){
//     //
//     const p1_x = inX + offset 
//     const p1_y = inY
//     const p2_x = p1_x  
//     const p2_y = p1_y - sizeY
//     //
//     const p3_x = p2_x +  parseInt( Math.cos(angle* 0.0174533) * sizeX , 10 )
//     const p3_y = p2_y - parseInt( Math.sin(angle* 0.0174533) * sizeX , 10 )
//     const p4_x = p3_x
//     const p4_y = p3_y + sizeY
//     //
//     return [p1_x , p1_y , p2_x , p2_y , p3_x , p3_y , p4_x , p4_y] 
// };

