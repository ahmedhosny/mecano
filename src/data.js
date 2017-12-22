import {setMecanoBounds} from './utils';
import {Graph} from './classes/Graph';

/**
 * input either from user or reading a file..
 * @type {Array}
 */
let inputData = {
  user: 'ahmed',
  version: '0.0.1',
  name: 'my_first_mecano',
  root: ['b89216bc-7f3f-43b8-9e6c-29f4a752f347'],
  nodes: [
    {
      key: 'b89216bc-7f3f-43b8-9e6c-29f4a752f347',
      name: 'someName',
      component: 'Input2d',
      shape: {
        D0: 1,
        D1: 400,
        D2: 225,
      },
      params: {},
    },
    {
      key: 'a962377b-9738-42b4-86e0-e0420f4f145d',
      name: 'dfd',
      component: 'Input2d',
      shape: {
        D0: 1,
        D1: 10,
        D2: 224,
      },
      params: {},
    },
    {
      key: '40fa28ec-d6d1-4f99-ac3e-b60735d13378',
      name: 'name1',
      component: 'Conv2d',
      shape: {
        D0: 1,
        D1: 120,
        D2: 120,
        D3: 128,
      },
      params: {
        kernel: {
          D1: 55,
          D2: 55,
        },
      },
    },
    {
      key: 'b0c411f8-a9ef-4170-8182-addd83553ae8',
      name: 'name2',
      component: 'Conv2d',
      shape: {
        D0: 1,
        D1: 80,
        D2: 80,
        D3: 96,
      },
      params: {
        kernel: {
          D1: 55,
          D2: 55,
        },
      },
    },
    {
      key: 'a6437539-1e67-4907-9ae2-e855fc78a0ea',
      name: 'pool1',
      component: 'Pool2d',
      shape: {
        D0: 1,
        D1: 55,
        D2: 55,
        D3: 128,
      },
      params: {},
    },
    {
      key: '1d62e2f6-824b-4f4b-8035-44b67e66e8af',
      name: 'sik',
      component: 'Conv2d',
      shape: {
        D0: 1,
        D1: 55,
        D2: 55,
        D3: 32,
      },
      params: {
        kernel: {
          D1: 30,
          D2: 30,
        },
      },
    },
    {
      key: '72af983b-9b08-4c39-844d-fb3c12a44804',
      name: 'pool6',
      component: 'Pool2d',
      shape: {
        D0: 1,
        D1: 55,
        D2: 55,
        D3: 128,
      },
      params: {},
    },
  ],
  edges: [
    {
      source: 'b89216bc-7f3f-43b8-9e6c-29f4a752f347',
      target: '40fa28ec-d6d1-4f99-ac3e-b60735d13378',
    },
    {
      source: '40fa28ec-d6d1-4f99-ac3e-b60735d13378',
      target: 'b0c411f8-a9ef-4170-8182-addd83553ae8',
    },
    {
      source: 'b0c411f8-a9ef-4170-8182-addd83553ae8',
      target: 'a6437539-1e67-4907-9ae2-e855fc78a0ea',
    },
    {
      source: 'a6437539-1e67-4907-9ae2-e855fc78a0ea',
      target: '1d62e2f6-824b-4f4b-8035-44b67e66e8af',
    },
    {
      source: '1d62e2f6-824b-4f4b-8035-44b67e66e8af',
      target: 'a962377b-9738-42b4-86e0-e0420f4f145d',
    },
    {
      source: 'a962377b-9738-42b4-86e0-e0420f4f145d',
      target: '72af983b-9b08-4c39-844d-fb3c12a44804',
    },
  ],
};
/**
 * This function is called from mecano to redraw the graph.
 * 1. Build graph from input data.
 * 2. Traverse the graph and get a list of instances.
 * 3. Set mecano bounds based on primatives alone.
 * @param  {ReactElement} mecano - mecano
 * @return {Array} Array of class instances that are passed on to mecano and
 * converted to ReactElements.
 */
export function dataGenerator(mecano) {
  let graph = new Graph(inputData, mecano);
  let outputData = graph.traverse();
  setMecanoBounds(outputData, mecano);
  // populate with tags
  // getTags(data,mecano);
  return outputData;
}
