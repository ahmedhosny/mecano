import React, { Component } from 'react';
import './Construction.css';

export default class Construction extends Component {
  render() {
    var instance = this.props.instance;
    return (
      <g>
        {instance.in ? (
          <circle
            className="constructionCircleIn"
            r={this.props.radius}
            cx={instance.in.X}
            cy={instance.in.Y}
          />
        ) : null}
        {instance.bounds ? (
          <rect
            className="constructionRect"
            x={instance.bounds.min.X}
            y={instance.bounds.min.Y}
            width={instance.bounds.max.X - instance.bounds.min.X}
            height={instance.bounds.max.Y - instance.bounds.min.Y}
          />
        ) : null}
        {instance.out
          ? instance.out.map((m, index) => {
              return (
                <circle
                  className="constructionCircleOut"
                  r={this.props.radius * 1.5}
                  cx={m.X}
                  cy={m.Y}
                  key={'out-' + index}
                />
              );
            })
          : null}
        {/* TODO: cleanup - duplicated for now (top and bottom anchors) */}
        {instance.tagAnchors
          ? instance.tagAnchors.top.map((m, index) => {
              return (
                <circle
                  className="constructionTagAnchor"
                  r={this.props.radius * 1.5}
                  cx={m.X}
                  cy={m.Y}
                  key={'tagAnchor-' + index + '-' + m.key}
                />
              );
            })
          : null}
        {instance.tagAnchors
          ? instance.tagAnchors.bottom.map((m, index) => {
              return (
                <circle
                  className="constructionTagAnchor"
                  r={this.props.radius}
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
