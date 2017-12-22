import React, {Component} from 'react';
/**
 * Thicker outline for some primatives.
 */
export default class Outline extends Component {
  /**
   * Returns an outline.
   * @return {ReactElement}
   */
  render() {
    return (
      <filter id="outline">
        <feMorphology operator="dilate" in="SourceAlpha" radius={2} />
        <feComposite in="SourceGraphic" />
      </filter>
    );
  }
}

