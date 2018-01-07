import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ReactSVGPanZoom} from 'react-svg-pan-zoom';
import {components} from '../components';
import {withTheme} from 'material-ui/styles';
import Dots from '../ui/Dots';
import Construction from '../helpers/Construction';
import MecanoConstruction from '../helpers/MecanoConstruction';
import {getGeometricMidpoint} from '../utils';
/**
 * Viewer component.
 */
class Viewer extends Component {
  /**
   * Sets additional props.
   * @param  {ReactProps} props
   */
  constructor(props) {
    super(props);
    this.Viewer = null;
    this.margin = 50;
  }
  /**
   * Will happen on component did mount or when zoom all button is pressed.
   * 1. Checks whether the mecanoRatio or divRatio is larger.
   * 2. Insert margin (state) either along X or Y.
   * 3. Get the new height or width based on divRatio.
   * 4. Set viewer zoom.
   */
  fitAll() {
    const bounds = this.props.bounds;
    const divRatio = this.props.width / this.props.height;
    const mecanoWidth = bounds.max.X - bounds.min.X;
    const mecanoHeight = bounds.max.Y - bounds.min.Y;
    const mecanoRatio = mecanoWidth / mecanoHeight;
    let geometricMidpoint = getGeometricMidpoint(bounds);
    if (divRatio <= mecanoRatio) {
      let newMinX = geometricMidpoint.X - mecanoWidth / 2 - this.margin;
      let newMaxX = geometricMidpoint.X + mecanoWidth / 2 + this.margin;
      let newHeight = (newMaxX - newMinX) / divRatio;
      this.Viewer.fitSelection(
        newMinX,
        geometricMidpoint.Y - newHeight / 2,
        newMaxX - newMinX,
        newHeight
      );
      console.log('right and left are margin');
    } else {
      let newMinY = geometricMidpoint.Y - mecanoHeight / 2 - this.margin;
      let newMaxY = geometricMidpoint.Y + mecanoHeight / 2 + this.margin;
      let newWidth = (newMaxY - newMinY) * divRatio;
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
   * Component did mount - fits views.
   */
  componentDidMount() {
    this.fitAll();
  }
  /**
   * Returns ReactSVGPanZoom with all dots, components and construction guide.
   * @return {ReactElement}
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
          {/* dots */}
          <Dots
            canvas={this.props.canvas}
            grid={this.props.grid}
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
                {/* guides */}
                {this.props.construction ? <Construction instance={n} /> : null}
              </g>
            );
          })}
          {/* MecanoConstruction */}
          {this.props.construction ?
            <MecanoConstruction
            bounds={this.props.bounds}
            canvas={this.props.canvas}
            grid={this.props.grid}
            padding={this.props.padding}
             />
            : null}
        </svg>
      </ReactSVGPanZoom>
    );
  }
}
Viewer.propTypes = {
  theme: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  construction: PropTypes.bool.isRequired,
  bounds: PropTypes.object.isRequired,
  canvas: PropTypes.object.isRequired,
  grid: PropTypes.object.isRequired,
  padding: PropTypes.object.isRequired,
};
export default withTheme()(Viewer);
