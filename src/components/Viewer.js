import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ReactSVGPanZoom} from 'react-svg-pan-zoom';
import {components} from '../components';
// UI
import {withTheme} from 'material-ui/styles';
import Dots from '../ui/Dots';
// helpers
import Construction from '../helpers/Construction';
import Bbox from '../helpers/Bbox';
import {getGeometricMidpoint} from '../utils';

/**
 * [Viewer description]
 * @extends Component
 */
class Viewer extends Component {
  /**
   * [constructor description]
   * @param  {[type]} props [description]
   */
  constructor(props) {
    super(props);
    this.Viewer = null;
    this.margin = 50;
  }
  // will happen on component did mount or when zoom all button presses
  /**
   * [fitAll description]
   */
  fitAll() {
    const bounds = this.props.bounds;
    const divWidth = this.props.width;
    const divHeight = this.props.height;
    //
    const divRatio = divWidth / divHeight;
    const mecanoWidth = bounds.max.X - bounds.min.X;
    const mecanoHeight = bounds.max.Y - bounds.min.Y;
    const mecanoRatio = mecanoWidth / mecanoHeight;

    //
    let geometricMidpoint = getGeometricMidpoint(bounds);
    //
    if (divRatio <= mecanoRatio) {
      // need to ensure width has margins
      let newMinX = geometricMidpoint.X - mecanoWidth / 2 - this.margin;
      let newMaxX = geometricMidpoint.X + mecanoWidth / 2 + this.margin;
      // get new height
      let newHeight = (newMaxX - newMinX) / divRatio;
      // check if difference between new height and mecano height is less than
      // margin*2, if so, then make sure it converts to margin*2
      this.Viewer.fitSelection(
        newMinX,
        geometricMidpoint.Y - newHeight / 2,
        newMaxX - newMinX,
        newHeight
      );
      console.log('right and left are margin');
    } else {
      // need to ensure width has margins
      let newMinY = geometricMidpoint.Y - mecanoHeight / 2 - this.margin;
      let newMaxY = geometricMidpoint.Y + mecanoHeight / 2 + this.margin;
      // get new height
      let newWidth = (newMaxY - newMinY) * divRatio;
      // check if difference between new height and mecano height is less than
      //  margin*2, if so, then make sure it converts to margin*2
      this.Viewer.fitSelection(
        geometricMidpoint.X - newWidth / 2,
        newMinY,
        newWidth,
        newMaxY - newMinY
      );
      console.log('top and bottom are margin');
    }
  }
  /**
   * [componentDidMount description]
   */
  componentDidMount() {
    this.fitAll();
  }
  /**
   * [render description]
   * @return {[type]} [description]
   */
  render() {
    const {theme} = this.props;
    return (
      <ReactSVGPanZoom
        ref={(Viewer) => (this.Viewer = Viewer)}
        SVGBackground={theme.viewer.backgroundColor}
        background={theme.palette.grey['300']}
        width={this.props.width}
        height={this.props.height}
        onClick={(event) =>
          console.log('click', event.x, event.y, event.originalEvent)
        }
        // scaleFactorOnWheel={5}
        // onMouseUp={event => console.log('up', event.x, event.y)}
        // onMouseMove={event => console.log('move', event.x, event.y)}
        // onMouseDown={event => console.log('down', event.x, event.y)}
        // scaleFactor={500}
        tool={'auto'}
        toolbarPosition={'none'}
        miniaturePosition={'none'}
        detectAutoPan={false}
        disableDoubleClickZoomWithToolAuto={true}
      >
        <svg width={this.props.canvas.X} height={this.props.canvas.Y}>
          {/* grid */}
          <Dots
            canvas={this.props.canvas}
            grid={this.props.grid}
            construction={this.props.construction}
          />
          {/* components */}
          {this.props.data.map((n, index) => {
            let Component = components[n.component].component;
            return (
              <g
                key={'group-' + n.key}
                onClick={(event) => console.log('clicked on: ', n.key)}
              >
                <Component instance={n} />
                {this.props.construction ? (
                  <Construction instance={n} radius={5} />
                ) : null}
              </g>
            );
          })}
          {/* guides */}
          {this.props.construction ? (
            <Bbox bounds={this.props.bounds} radius={3} />
          ) : null}
        </svg>
      </ReactSVGPanZoom>
    );
  }
}

Viewer.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  construction: PropTypes.bool.isRequired,
  bounds: PropTypes.object.isRequired,
  canvas: PropTypes.object.isRequired,
  grid: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withTheme()(Viewer);
