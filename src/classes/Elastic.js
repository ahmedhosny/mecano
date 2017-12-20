import {Base} from './Base';
import {Plane} from './Primative';
import {zipWith} from 'lodash';
/**
 * Elastic class.
 */
class Elastic extends Base {
  /**
   * Constructs the elastic class.
   * @param  {Array} sourceCoords Selected out coords of source
   * [[{'X':0,'Y':0},{'X':0,'Y':0}...].
   * @param  {Array} targetCoords Selected out coords of target
   * [[{'X':0,'Y':0},{'X':0,'Y':0}...].
   * @param  {number} options.angle From mecano.state.
   * @param  {Object} options.sourceParams Kernel size and other info of
   * source - from inputData.
   * @param  {Object} options.targetParams Kernel size and other info or
   *  target - form inputData.
   */
  constructor(
    sourceCoords,
    targetCoords,
    {angle = 30, sourceParams = {}, targetParams = {}} = {}
  ) {
    super();
    this.sourceCoords = sourceCoords;
    this.targetCoords = targetCoords;
    this.angle = angle;
    this.sourceParams = sourceParams;
    this.targetParams = targetParams;
  }
}
/**
 * A line(s) between two sets of X,Y pairs.
 */
export class Line extends Elastic {
  /**
   * Draws a line(s) between the specific indicies of sourceCoords and
   * targetCoords.
   */
  draw() {
    let _this = this;
    zipWith(this.sourceCoords, this.targetCoords, function(_from, to) {
      _this.coordinates.push({
        X1: _from.X,
        Y1: _from.Y,
        X2: to.X,
        Y2: to.Y,
      });
    });
  }
}
/**
 * Draws sideways pyramid.
 */
export class Pyramid extends Elastic {
  /**
   * Draws the base of the sideways pyramid followed by two triangles
   * representing the sides.
   * Can scale to draw multiple pyramids at once.
   * First two lists are the two triangles and the third is the hidden line.
   */
  draw() {
    let _this = this;
    zipWith(this.sourceCoords, this.targetCoords, function(_from, to) {
      const plane = new Plane(
        {
          D0: 1,
          D1: _this.targetParams.kernel.D1,
          D2: _this.targetParams.kernel.D2,
        },
        _this.angle,
        _from
      );
      plane.draw();
      const coords = plane.coordinates[0];
      const triangle1 = [
        coords[0],
        coords[1],
        coords[2],
        coords[3],
        to.X,
        to.Y,
      ];
      const triangle2 = [
        coords[2],
        coords[3],
        coords[4],
        coords[5],
        to.X,
        to.Y,
      ];
      const hidden = [
        coords[0],
        coords[1],
        coords[6],
        coords[7],
        coords[4],
        coords[5],
      ];
      _this.coordinates.push([triangle1, triangle2, hidden]);
    });
  }
}
