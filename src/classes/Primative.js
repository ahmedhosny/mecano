import {Base} from './Base';
import {flatten, pullAt, range} from 'lodash';
import {getPlaneCoordinates, getGeometricMidpoint, setBounds} from '../utils';
/**
 * Primative class.
 */
class Primative extends Base {
  /**
   * Basic primative class - other inherit from here.
   * @param  {Object} shape Shape of primative - from inputData
   * in data.js  {'D0':1,'D1':224,'D2':224,...}
   * @param  {number} angle View angle from mecano.
   * @param  {Object} position X,Y position on the screen grid. Geomtric
   * midpoint should be same as position when primative mounts.
   * @param  {string} [name='someName'] Primative name.
   * @param  {Object} [params={}] Other params like kernel size.
   * @param  {Object} [padding={X: 0, Y: 0}] How far the name tags are. Only Y
   * used for now.
   * @todo Name tags might end up going on the grid - so padding might be
   * obselete.
   */
  constructor(
    shape,
    angle,
    position,
    {name = 'someName', params = {}, padding = {X: 0, Y: 0}} = {}
  ) {
    super();
    this.shape = shape;
    this.angle = angle;
    this.position = position;
    this.name = name;
    this.params = params;
    this.padding = padding;
    this.in = {X: 0, Y: 0};
    this.out = [];
    this.bounds = {
      min: {
        X: 0,
        Y: 0,
      },
      max: {
        X: 0,
        Y: 0,
      },
    };
    this.geometricMidpoint = {X: 0, Y: 0};
    this.tagAnchors = {
      top: [],
      bottom: [],
    };
  }
  /**
   * Sets the bounding box X and Y coordinates of the entire primative.
   * Works for plane and planeStack.
   */
  setBounds() {
    let coords = flatten(this.coordinates);
    const allX = pullAt(coords, range(0, coords.length, 2));
    const allY = coords;
    setBounds(allX, allY, this);
  }
  /**
   * Moves the primative so that it is centered around the given position.
   * 1. Gets the bounds of primative drawn at 0,0.
   * 2. Gets the geometric midpoint.
   * 3. Moves the primative by setting the in values.
   */
  move() {
    this.setBounds();
    this.geometricMidpoint = getGeometricMidpoint(this.bounds);
    this.in.X = this.position.X - this.geometricMidpoint.X;
    this.in.Y = this.position.Y - this.geometricMidpoint.Y;
  }
  /**
   * Sets the tag anchors for text, extra info.
   */
  setTagAnchors() {
    let offset = 0;
    if (this.stack > 1) {
      offset = this.coordinates[0][6] - this.coordinates[0][0];
    }
    this.tagAnchors.top = [
      {
        X: parseInt((this.bounds.min.X + this.bounds.max.X + offset) / 2, 10),
        Y: this.bounds.min.Y - this.padding.Y,
      },
    ];
    this.tagAnchors.bottom = [
      {
        X: parseInt((this.bounds.min.X + this.bounds.max.X - offset) / 2, 10),
        Y: this.bounds.max.Y + this.padding.Y,
      },
    ];
  }
}
/**
 * Plane class.
 */
export class Plane extends Primative {
  /**
   * Constructs a Plane.
   * @param  {array} args Args from Primative constructor.
   */
  constructor(...args) {
    super(...args);
    this.stack = 1;
    this.tags = [
      {
        component: 'Shape',
        text1: '-',
        text2: this.shape.D0 + '*' + this.shape.D1 + '*' + this.shape.D2,
      },
      {
        component: 'Name',
        text1: this.name,
      },
    ];
  }
  /**
   * Sets the out points for the plane primative.
   * 1. Pushes geometric midpoint.
   * 2. Pushes specific coords.
   */
  setOut() {
    this.geometricMidpoint = getGeometricMidpoint(this.bounds);
    this.out.push({
      X: this.geometricMidpoint.X,
      Y: this.geometricMidpoint.Y,
    });
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
   * 1. Draws at 0,0.
   * 2. Moves to center around position and calculate new in coords.
   * 3. Draws again at new in coords.
   * 4. Sets new bounds.
   * 5. Sets out coords.
   * 6. Sets tag anchors.
   */
  draw() {
    this.coordinates = getPlaneCoordinates(this);
    this.move();
    this.coordinates = getPlaneCoordinates(this);
    this.setBounds();
    this.setOut();
    this.setTagAnchors();
  }
}
/**
 * PlaneStack class.
 */
export class PlaneStack extends Plane {
  /**
   * Constructs a PlaneStack.
   * @param  {array} args Args from Primative constructor.
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
