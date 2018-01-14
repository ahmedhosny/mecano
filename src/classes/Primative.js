import {Base} from './Base';
import {pullAt, range} from 'lodash';
import {
  getPlaneCoordinates,
  getGridCoordinates,
  getGeometricMidpoint,
} from '../utils';
/**
 * Primative class.
 */
class Primative extends Base {
  /**
   * Basic primative class - other inherit from here.
   * @param  {Object} shape Shape of primative - from inputData
   * in data.js  {'D0':1,'D1':224,'D2':224,...}
   * @param  {number} angle - Angle of mecano state.
   * @param  {Object} position X,Y position on the screen grid. Geomtric
   * @param  {Object} unit - Size of unit :X:5,y:5}.
   * midpoint should be same as position when primative mounts.
   * @param  {string} [name='someName'] Primative name.
   * @param  {Object} [params={}] Other params like kernel size.
   */
  constructor(
    shape,
    angle,
    position,
    unit,
    {name = 'someName', params = {}} = {}
  ) {
    super();
    this.shape = shape;
    this.angle = angle;
    this.position = position;
    this.unit = unit;
    this.name = name;
    this.params = params;
    this.size = {}; // Object.assign({}, shape);
    this.in = {X: 0, Y: 0};
    this.out = [];
    this.sizeBounds = {alongX: 0, alongY: 0};
    this.geometricMidpoint = {X: 0, Y: 0};
  }
  /**
   * Sets the geometricMidpoint assuming this.in is 0,0
   * @return {Object} geometricMidpoint {X: 0, Y: 0}
   */
  setGeometricMidpoint() {
    return {X: this.in.X + this.sizeBounds.alongX/2,
            Y: this.in.Y - this.sizeBounds.alongY/2};
  }
  /**
   * Moves the primative so that it is centered around the given position.
   * 1. Gets the geometric midpoint.
   * 2. Moves the primative by setting the in values.
   */
  move() {
    this.geometricMidpoint = this.setGeometricMidpoint();
    this.in.X = this.position.X - this.geometricMidpoint.X;
    this.in.Y = this.position.Y - this.geometricMidpoint.Y;
  }
}
/**
 * Plane class.
 */
export class Plane extends Primative {
  /**
   * Constructs a Plane.
   * @param  {array} args Args from Primative constructor.
   * @todo stack should actually be D3 which doesnt exist in plane.
   */
  constructor(...args) {
    super(...args);
    this.stack = 1;
  }
  /**
   * Sets the size of the plane by multiplying unit and shape.
   * Unit is a square.
   */
  setSize() {
    this.size.D1 = this.shape.D1*this.unit.X;
    this.size.D2 = this.shape.D2*this.unit.Y;
  }
  /**
   * Sets the bounds of size along X and Y - just actual drawn width and
   * height.
   */
  setSizeBounds() {
    const cosAngle = Math.cos(this.angle * Math.PI / 180);
    const sinAngle = Math.sin(this.angle * Math.PI / 180);
    this.sizeBounds.alongX = this.size.D1*cosAngle;
    this.sizeBounds.alongY = this.size.D1*sinAngle + this.size.D2;
  }
  /**
   * Sets the out points for the plane primative.
   * 1. Pushes geometric midpoint.
   * 2. Pushes specific coords.
   */
  setOut() {
    this.geometricMidpoint = this.setGeometricMidpoint();
    this.out.push(this.geometricMidpoint);
    const idxs = [0, 1, 2];
    idxs.forEach((idx) => {
      this.out.push({
        X: this.coordinates[0][idx * 2],
        Y: this.coordinates[0][idx * 2 + 1],
      });
    });
  }
  /**
   * Draws the plane by using the following steps:
   * 0. Set size using unit*shape
   * 1. Sets the actual width and height.
   * 2. Moves to center around position and calculate new in coords.
   * 3. Draws is by setting this.coordinates.
   * 4. Sets out coords.
   */
  draw() {
    this.setSize();
    this.setSizeBounds();
    this.move();
    this.coordinates = getPlaneCoordinates(this);
    this.setOut();
  }
}
/**
 * PlaneGrided class.
 * It is also overlaid with a grid.
 */
export class PlaneGrided extends Plane {
  /**
   * Constucts a PlaneGrided.
   * @param  {array} args Args from Plane constructor.
   */
  constructor(...args) {
    super(...args);
    this.gridCoordinates = [];
  }
  /**
   * Overwrites the Plane draw ().
   * 1. Draws as usual.
   * 2. No set out for now.
   * 3. Adds grid coordinates.
   */
  draw() {
    this.setSize();
    this.setSizeBounds();
    this.move();
    this.coordinates = getPlaneCoordinates(this);
    this.gridCoordinates = getGridCoordinates(this);
  }
}
/**
 * Everything below here needs to be redone..
 */
/**
 * PlaneStack class.
 */
export class PlaneStack extends Plane {
  /**
   * Constructs a PlaneStack.
   * @param  {array} args Args from Plane constructor.
   */
  constructor(...args) {
    super(...args);
    this.stack = Math.max(Math.floor(this.shape.D3 / 10), 2);
    this.stackPadding = 15;
    this.tags = [
      {
        component: 'Shape',
        text1: this.shape.D3,
        text2: this.shape.D0 + '*' + this.shape.D1 + '*' + this.shape.D2,
      },
      {
        component: 'Name',
        text1: this.name,
      },
    ];
  }
  /**
   * Calculates the geometric midpoint of a single plane.
   * @param {number} index Index of list within this.coordinates.
   * @return {Object} The midpoint {'X':000,'Y':000}.
   */
  getPlaneGeometricMidpoint(index) {
    const coords = this.coordinates[index].slice();
    const allX = pullAt(coords, range(0, coords.length, 2));
    const allY = coords;
    let obj = {
      X:
        parseInt((Math.max(...allX) - Math.min(...allX)) / 2, 10) +
        Math.min(...allX),
      Y:
        parseInt((Math.max(...allY) - Math.min(...allY)) / 2, 10) +
        Math.min(...allY),
    };
    return obj;
  }
  /**
   * Sets the out coords for a single plane.
   * 1. Pushes geometric midpoint of that plane.
   * 2. Pushes specific coords.
   * @param {int} index Index of plane to set out coords for
   */
  setPlaneOut(index) {
    this.out.push(this.getPlaneGeometricMidpoint(index));
    const idxs = [0, 1, 2];
    idxs.forEach((idx) => {
      this.out.push({
        X: this.coordinates[index][idx * 2],
        Y: this.coordinates[index][idx * 2 + 1],
      });
    });
  }
  /**
   * Sets the out points for the planeStack primative.
   * Overwrites the plane setOut().
   * 1. Sets geometric midpoint of entire PlaneStack.
   * 2. Sets out point of first Plane.
   * 3. Sets out points of last Plane.
   */
  setOut() {
    this.geometricMidpoint = getGeometricMidpoint(this.bounds);
    this.out.push({
      X: this.geometricMidpoint.X,
      Y: this.geometricMidpoint.Y,
    });
    this.setPlaneOut(0);
    this.setPlaneOut(this.coordinates.length - 1);
  }
}
