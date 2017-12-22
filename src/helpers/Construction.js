import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Construction.css';
/**
 * Construction lines
 */
export default class Construction extends Component {
  /**
   * Draws in/out circles, bounding rectangle and top/bottom tag anchors.
   * @return {ReactElement}
   */
  render() {
    let instance = this.props.instance;
    let bounds = this.props.instance.bounds;
    return (
      <g>
        {/* in */}
        {instance.in ? (
          <circle
            className="constructionCircleIn"
            r={5}
            cx={instance.in.X}
            cy={instance.in.Y}
          />
        ) : null}
        {/* out */}
        {instance.out
          ? instance.out.map((m, index) => {
              return (
                <circle
                  className="constructionCircleOut"
                  r={7}
                  cx={m.X}
                  cy={m.Y}
                  key={'out-' + index}
                />
              );
            })
          : null}
        {/* bounds */}
        {instance.bounds ? (
          <rect
            className="constructionRect"
            x={bounds.min.X}
            y={bounds.min.Y}
            width={bounds.max.X - bounds.min.X}
            height={bounds.max.Y - bounds.min.Y}
          />
        ) : null}
        {/* top anchor */}
        {instance.tagAnchors
          ? instance.tagAnchors.top.map((m, index) => {
              return (
                <circle
                  className="constructionTagAnchor"
                  r={7}
                  cx={m.X}
                  cy={m.Y}
                  key={'tagAnchor-' + index + '-' + m.key}
                />
              );
            })
          : null}
        {/* bottom anchor */}
        {instance.tagAnchors
          ? instance.tagAnchors.bottom.map((m, index) => {
              return (
                <circle
                  className="constructionTagAnchor"
                  r={5}
                  cx={m.X}
                  cy={m.Y}
                  key={'tagAnchor-' + index + '-' + m.key}
                />
              );
            })
          : null}
      </g>
    );
  }
}
Construction.propTypes = {
  instance: PropTypes.object.isRequired,
};
