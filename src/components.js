/**
 * Components - primatives
 */
import Input2d from './components/Input2d';
import Conv2d from './components/Conv2d';
import Pool2d from './components/Pool2d';
import ArithmeticOutput2d from './components/ArithmeticOutput2d';
/**
 * Components - elastics
 */
import Funnel from './components/Funnel';
import Kernel from './components/Kernel';
/**
 * Components - tags
 */
import Shape from './components/Shape';
import Name from './components/Name';
/**
 * Classes - primatives
 */
import {Plane, PlaneStack, PlaneGrided} from './classes/Primative';
/**
 * Classes - elastics
 */
import {Line, Pyramid} from './classes/Elastic';
/**
 * Classes - tags
 */
import {BottomTag} from './classes/Tag';
/**
 * Object that maps the react components with the classes that make them.
 */
export const components = {
  /*
   * primatives
   */
  Input2d: {
    type: 'primative',
    class: Plane,
    component: Input2d,
    target: [
      {
        target: 'Input2d',
        sourceOut: [1, 2, 3],
        targetOut: [1, 2, 3],
        elastic: 'Funnel',
      },
      {
        target: 'Conv2d',
        sourceOut: [0],
        targetOut: [1],
        elastic: 'Kernel',
      },
      {
        target: 'Pool2d',
        sourceOut: [1, 2, 3],
        targetOut: [2, 3, 4],
        elastic: 'Funnel',
      },
    ],
  },
  Conv2d: {
    type: 'primative',
    class: PlaneStack,
    component: Conv2d,
    target: [
      {
        target: 'Conv2d',
        sourceOut: [5],
        targetOut: [1],
        elastic: 'Kernel',
      },
      {
        target: 'Input2d',
        sourceOut: [6, 7, 8],
        targetOut: [1, 2, 3],
        elastic: 'Funnel',
      },
      {
        target: 'Pool2d',
        sourceOut: [6, 7, 8],
        targetOut: [2, 3, 4],
        elastic: 'Funnel',
      },
    ],
  },
  Pool2d: {
    type: 'primative',
    class: PlaneStack,
    component: Pool2d,
    target: [
      {
        target: 'Pool2d',
        sourceOut: [6, 7, 8],
        targetOut: [2, 3, 4],
        elastic: 'Funnel',
      },
      {
        target: 'Conv2d',
        sourceOut: [5],
        targetOut: [1],
        elastic: 'Kernel',
      },
      {
        target: 'Input2d',
        sourceOut: [6, 7, 8],
        targetOut: [1, 2, 3],
        elastic: 'Funnel',
      },
    ],
  },
  ArithmeticOutput2d: {
    type: 'primative',
    class: PlaneGrided,
    component: ArithmeticOutput2d,
  },
  /*
   * elastics
   */
  Funnel: {
    type: 'elastic',
    class: Line,
    component: Funnel,
  },
  Kernel: {
    type: 'elastic',
    class: Pyramid,
    component: Kernel,
  },
  /*
   * tags
   */
  Shape: {
    type: 'tag',
    class: BottomTag,
    component: Shape,
  },
  // Name: {
  //   type: 'tag',
  //   class: TopTag,
  //   component: Name,
  // },
};
