/**
 * Returns the coordinates of a 2d plane.
 * @param  {Object} instance - the object
 * @return {Array} [x1,y1,x2,y2,x3,y3,x4,y4] or [[x1,y1..],[x1,y1..]]
 */
export function getPlaneCoordinates(instance) {
  let out = [];
  let offset = 0;
  for (let i = 0; i < instance.stack; i++) {
    if (instance.stackPadding) {
      offset = i * instance.stackPadding;
    }
    const p1x = instance.in.X + offset;
    const p1y = instance.in.Y;
    const p2x = p1x;
    const p2y = p1y - instance.shape.D2;
    const p3x =
      p2x +
      parseInt(Math.cos(instance.angle * 0.0174533) * instance.shape.D1, 10);
    const p3y =
      p2y -
      parseInt(Math.sin(instance.angle * 0.0174533) * instance.shape.D1, 10);
    const p4x = p3x;
    const p4y = p3y + instance.shape.D2;
    out.push([p1x, p1y, p2x, p2y, p3x, p3y, p4x, p4y]);
  }
  return out;
}
/**
 * Sets the bounding box dims by getting the min and max in both axes
 * @param {Array} allX - list of all X coords
 * @param {Array} allY - list of all Y coords
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
