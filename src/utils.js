/**
 * Helper function for getPlaneCoordinates and getGridCoordinates.
 * @param  {number} startX - Start X coordinate.
 * @param  {number} startY - Start Y coordinate.
 * @param  {number} angle - mecano angle.
 * @param  {number} D1 - width.
 * @param  {number} D2 - height.
 * @param  {number} [offset=0] - offset for plane stack - optional.
 * @return {array} x, y coordinates for all four points in clockwise direction
 * starting from the bottom left.
 */
function getFourCoordinates(startX, startY, angle, D1, D2, offset = 0) {
  const p1x = startX + offset;
  const p1y = startY;
  const p2x = p1x;
  const p2y = p1y - D2;
  const p3x = p2x + Math.cos(angle * Math.PI / 180) * D1;
  const p3y = p2y - Math.sin(angle * Math.PI / 180) * D1;
  const p4x = p3x;
  const p4y = p3y + D2;
  return [p1x, p1y, p2x, p2y, p3x, p3y, p4x, p4y];
}
/**
 * Returns the coordinates of a 2d plane.
 * @param  {Object} instance - the object
 * @return {array} [x1,y1,x2,y2,x3,y3,x4,y4] or [[x1,y1..],[x1,y1..]]
 */
export function getPlaneCoordinates(instance) {
  let out = [];
  let offset = 0;
  for (let i = 0; i < instance.stack; i++) {
    if (instance.stackPadding) {
      offset = i * instance.stackPadding;
    }
    const coords = getFourCoordinates(
      instance.in.X,
      instance.in.Y,
      instance.angle,
      instance.size.D1,
      instance.size.D2,
      offset
    );
    out.push(coords);
  }
  return out;
}
/**
 * Nested for loop to draw a grid on planes.
 * @param  {Object} instance - the object
 * @return {array} an array of coordinate arrays for grid elements.
 */
export function getGridCoordinates(instance) {
  let gridCoordinates = [];
  let startX = instance.coordinates[0][0];
  let startY = instance.coordinates[0][1];
  for (let i = 0; i < instance.shape.D2; i++) {
    for (let j = 0; j < instance.shape.D1; j++) {
      const coords = getFourCoordinates(
        startX,
        startY,
        instance.angle,
        instance.gridSize,
        instance.gridSize
      );
      startX = coords[6];
      startY = coords[7];
      gridCoordinates.push(coords);
    }
    startX = instance.coordinates[0][0];
    startY = instance.coordinates[0][1] - instance.gridSize * (i + 1);
  }
  return gridCoordinates;
}
/**
 * Sets the bounding box dims by getting the min and max in both axes
 * @param {array} allX - list of all X coords
 * @param {array} allY - list of all Y coords
 * @param {Object} obj - object to set its bounds
 */
export function setBounds(allX, allY, obj) {
  obj.bounds.min.X = Math.min(...allX);
  obj.bounds.max.X = Math.max(...allX);
  obj.bounds.min.Y = Math.min(...allY);
  obj.bounds.max.Y = Math.max(...allY);
}
/**
 * Sets the geometric center of the bounding box.
 * @param  {Object} bounds {'min':{'X':0,'Y':0},'max':{'X':0,'Y':0}}.
 * @return {Object} The geometricMidpoint.
 */
export function getGeometricMidpoint(bounds) {
  const X = parseInt((bounds.max.X - bounds.min.X) / 2, 10) + bounds.min.X;
  const Y = parseInt((bounds.max.Y - bounds.min.Y) / 2, 10) + bounds.min.Y;
  return {X: X, Y: Y};
}
/**
 * Sets mecano bounds.
 * @param {Array} data List of primatives.
 * @param {ReactElement} mecano
 */
export function setMecanoBounds(data, mecano) {
  let allX = [];
  let allY = [];
  data.forEach((m, index) => {
    if (m.type === 'primative') {
      allX.push(m.bounds.min.X, m.bounds.max.X);
      allY.push(m.bounds.min.Y, m.bounds.max.Y);
    }
  });
  setBounds(allX, allY, mecano.state);
}
/**
 * Gets distance between two points - not used.
 * @param  {number} startX - X start of line.
 * @param  {number} startY - Y start of line.
 * @param  {number} endX - X end of line.
 * @param  {number} endY - Y end of line.
 * @return {number} distance.
 */
// function getDistance(startX, startY, endX, endY) {
//   const length = Math.sqrt(
//     Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
//   );
//   return length;
// }
/**
 * Helper function to get coordinates of a point on a line given a distance
 * from the line's start point. Not used for now.
 * @param  {number} startX - X start of line.
 * @param  {number} startY - Y start of line.
 * @param  {number} endX - X end of line.
 * @param  {number} endY - Y end of line.
 * @param  {number} distance - distance from start point.
 * @return {array} [x,y] coords of point.
 */
// function getPointOnLine(startX, startY, endX, endY, distance) {
//   const length = getDistance(startX, startY, endX, endY);
//   const ratio = distance / length;
//   const coords = [
//     (1 - ratio) * startX + ratio * endX,
//     (1 - ratio) * startY + ratio * endY,
//   ];
//   return coords;
// }
