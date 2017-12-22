import {Base} from './Base';
import {Line} from './Elastic';
import {zipWith} from 'lodash';
/**
 * Tag class.
 */
class Tag extends Base {
  /**
   * Basic tag class - other inherit from here.
   * @param  {Object} tag - tag entry from primative.tags - looks something
   * like this {'component':'Name', 'text1': this.name}.
   * @param  {Object} tagAnchors - from primative.tagAnchors - looks something
   * like this {'top':[],'bottom':[]}.
   */
  constructor(tag, tagAnchors) {
    super();
    // arguments
    this.tag = tag;
    this.tagAnchors = tagAnchors;
  }
  /**
   * Draws line(s) and adds to coordinates.
   * @param  {Array} sourceCoords - Array of coordiante objects {'X':00,'Y':00}.
   * @param  {Array} targetCoords - Array of coordiante objects {'X':00,'Y':00}.
   */
  drawLines(sourceCoords, targetCoords) {
    let _this = this;
    zipWith(sourceCoords, targetCoords, function(_from, to) {
      const line = new Line([_from], [to]);
      line.draw();
      _this.coordinates.push(line.coordinates[0]);
    });
  }
}
/**
 * BottomTag Class.
 */
export class BottomTag extends Tag {
  /**
   * Bottom Tag constructor.
   * @param  {Array} args Args from Tag class.
   */
  constructor(...args) {
    super(...args);
    this.halfLine = 30;
  }
  /**
   * Draws the BottomTag.
   * 1. Gets anchor.
   * 2. Draws the Line.
   * 3. Draws text1 and text2.
   */
  draw() {
    const anchor = this.tagAnchors.bottom[0];
    this.drawLines(
      [
        {
          X: anchor.X - this.halfLine,
          Y: anchor.Y,
        },
      ],
      [
        {
          X: anchor.X + this.halfLine,
          Y: anchor.Y,
        },
      ]
    );
    this.text1 = this.tag.text1;
    this.text2 = this.tag.text2;
  }
}
/**
 * TopTag class.
 */
export class TopTag extends Tag {
  /**
   * TopTag constructor.
   * @param  {Array} args Args from Tag class.
   * @todo peak used to be
   * this.mecano.state.bounds.min.Y - this.mecano.state.padding.Y.
   */
  constructor(...args) {
    super(...args);
    this.peak = 200;
    this.minimumLength = 35;
  }
  /**
   * Draws the TopTag.
   * 1. Gets anchor.
   * 2. Draws the Line.
   * 3. Draws text1.
   */
  draw() {
    const anchor = this.tagAnchors.top[0];
    this.drawLines(
      [
        {
          X: anchor.X,
          Y: anchor.Y,
        },
      ],
      [
        {
          X: anchor.X,
          Y: this.peak - this.minimumLength,
        },
      ]
    );
    this.text1 = this.tag.text1;
  }
}
