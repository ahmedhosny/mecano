import {Base} from './Base';
import {Line} from './Elastic';
import {zipWith} from 'lodash';
/**
 * Tag class.
 */
class Tag extends Base {
  /**
   * Basic tag class - other inherit from here.
   * @param  {Object} attributes - Object including all atributes to be
   * displayed. {name:"",shape:{D0:1,D1:5,D2:10}}
   * @param {Object} position - position to insert the tag.
   * @param  {string} id - id of primative - optional
   */
  constructor(attributes, position, {id='dummy'} = {}) {
    super();
    // arguments
    this.attributes = attributes;
    this.position = position;
    this.id = 'tag-' + id;
  }
  /**
   * Draws line(s) and adds to coordinates.
   * @param  {Array} sourceCoords - Array of coordiante objects {'X':00,'Y':00}.
   * @param  {Array} targetCoords - Array of coordiante objects {'X':00,'Y':00}.
   */
  drawLines(sourceCoords, targetCoords) {
    let _this = this;
    zipWith(sourceCoords, targetCoords, function(source, target) {
      const line = new Line([source], [target]);
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
    const position = this.position;
    this.drawLines(
      [
        {
          X: position.X - this.halfLine,
          Y: position.Y,
        },
      ],
      [
        {
          X: position.X + this.halfLine,
          Y: position.Y,
        },
      ]
    );
    this.text1 = '5x5';
    // let shapeText = '';
    // console.log(this.attributes.shape);
    // this.attributes.shape.keys.forEach((m, index)=>{
    //   console.log(m);
    // });
    this.text2 = this.attributes.name;
  }
}
// /**
//  * TopTag class.
//  */
// export class TopTag extends Tag {
//   /**
//    * TopTag constructor.
//    * @param  {Array} args Args from Tag class.
//    * @todo peak used to be
//    * this.mecano.state.bounds.min.Y - this.mecano.state.padding.Y.
//    */
//   constructor(...args) {
//     super(...args);
//     this.peak = 200;
//     this.minimumLength = 35;
//   }
//   /**
//    * Draws the TopTag.
//    * 1. Gets anchor.
//    * 2. Draws the Line.
//    * 3. Draws text1.
//    */
//   draw() {
//     const anchor = this.tagAnchors.top[0];
//     this.drawLines(
//       [
//         {
//           X: anchor.X,
//           Y: anchor.Y,
//         },
//       ],
//       [
//         {
//           X: anchor.X,
//           Y: this.peak - this.minimumLength,
//         },
//       ]
//     );
//     this.text1 = this.tag.text1;
//   }
// }
