import {components} from '../components';
import {at} from 'lodash';
import uuidv4 from 'uuid';
/**
 * The mecano graph.
 */
export class Graph {
  /**
   *
   * @param  {Object} inputData Object formated in mecano json format.
   * @param  {Reactunit} mecano mecano React unit with its props.
   */
  constructor(inputData, mecano) {
    this.name = inputData.name;
    this.root = inputData.root;
    this.nodes = inputData.nodes;
    this.edges = inputData.edges;
    this.mecano = mecano;
    this.components = components;
  }
  /**
   * Sets visited on all nodes - used for traversing.
   * @param {Bool} bool Visted true or false.
   */
  setVisited(bool) {
    this.nodes.forEach((m, index) => {
      m.visited = bool;
    });
  }
  /**
   * Sets the root node given its key.
   * @todo only works with single root.
   */
  setRootNode() {
    let _this = this;
    const _root = this.nodes.filter((obj) => obj.key === _this.root[0]);
    this.rootNode = _root[0];
  }
  /**
   * Sets the X and Y position on the canvas (on the grid) according to the
   * node level.
   * @param {Object} node inputData node object.
   */
  setPosition(node) {
    node.position = {
      X: this.mecano.state.origin.X + this.mecano.state.grid.X * node.level.X,
      Y: this.mecano.state.origin.Y + this.mecano.state.grid.Y * node.level.Y,
    };
  }
  /**
   * Given a node, returns all its children in a list and in no specific order.
   * Based on the edges list in inputData.
   * 1. Get edges where this node is a source.
   * 2. Go through these edges and add one node per edge.
   * 3. Get nodes at the end of these edges.
   * @param  {Object} node inputData node object.
   * @return {Array} Array of nodes.
   */
  getChildren(node) {
    let out = [];
    const nextEdges = this.edges.filter((obj) => obj.source === node.key);
    nextEdges.forEach((l) => {
      const nextNode = this.nodes.filter((obj) => obj.key === l.target);
      if (nextNode.length !== 0) {
        out.push(nextNode[0]);
      }
    });
    return out;
  }
  /**
   * This function calculates the global unit size across all components.
   * 1. Adds shapeBounds to nodes: {alongX:5,alongY:4} for 2d and 3d,
   * assuming each unit is 1.
   * 2. Find out longest
   * 3. Calculates unit from longest.
   * @param  {Array} nodes - Array of all nodes in the graph
   * @return {Object} Global unit size - should be square {X:5,Y:5}.
   */
  calculateUnit() {
    let unit = 0;
    const cosAngle = Math.cos(this.mecano.state.angle * Math.PI / 180);
    const sinAngle = Math.sin(this.mecano.state.angle * Math.PI / 180);
    const cell = this.mecano.state.cell;
    let longest={
      nodeIdx: 0,
      value: 0,
      axis: 'X',
    };
    this.nodes.forEach((m, index) => {
      // if 2d
      m.shapeBounds = {
        alongX: m.shape.D1*cosAngle,
        alongY: m.shape.D1*sinAngle + m.shape.D2,
      };
      // if 3d
      if (m.shape.D3) {
        m.shapeBounds.alongX = m.shapeBounds.alongX + m.shape.D3;
      }
      // test X,Y and equality
      if (m.shapeBounds.alongX > longest.value
        & m.shapeBounds.alongX >= m.shapeBounds.alongY) {
        longest.nodeIdx = index;
        longest.value = m.shapeBounds.alongX;
        longest.axis = 'X';
      } else if (m.shapeBounds.alongY > longest.value
        & m.shapeBounds.alongY > m.shapeBounds.alongX) {
        longest.nodeIdx = index;
        longest.value = m.shapeBounds.alongY;
        longest.axis = 'Y';
      }
    });
    // now deduce unit size from longest.
    const longestNode = this.nodes[longest.nodeIdx];
    const D1 = longestNode.shape.D1;
    const D2 = longestNode.shape.D2;
    let D3 = 0;
    if (longestNode.shape.D3) {
      D3 = longestNode.shape.D3;
    }
    switch (longest.axis) {
      case 'X':
        unit = cell.X / (D3 + D1*cosAngle);
        break;
      case 'Y':
        unit = cell.Y / (D2 + D1*sinAngle);
        break;
      // no default
      }
    console.log(longest);
    return {X: unit, Y: unit};
  }
  /**
   * Reterns a primative object given a node from InputData.
   * @param  {Object} node - From inputData.
   * @param  {Object} unit - Global unit size - should be square {X:5,Y:5}.
   * @return {Object} A primative created from a specific class that is chosen
   * after consulting components.
   */
  getPrimative(node, unit) {
    const state = this.mecano.state;
    const Primative = components[node.component].class;
    const primative = new Primative(
      node.shape,
      state.angle,
      node.position,
      unit,
    {
      name: node.name,
      params: node.params,
      padding: state.padding,
    });
    primative.component = node.component;
    primative.key = node.key;
    primative.level = node.level;
    primative.type = 'primative';
    primative.draw();
    return primative;
  }
  /**
   * Inserts elastics in the primativeArray and modifies it in place.
   * 1. Loop through edges of inputData.
   * 2. Get the source and target primatives from primativeArray.
   * 3. Get index of target primative from primativeArray.
   * 4. Get the corresponding target entry from components and the elastic to
   * join the source and target primatives.
   * 5. Draw the elastic and insert it in the primativeArray.
   * @param  {Array} primativeArray Array of primatives arranged as per the
   * traverse function.
   */
  getElastics(primativeArray) {
    this.edges.forEach((m) => {
      const source = primativeArray.find((obj) => {
        return obj.key === m.source;
      });
      const target = primativeArray.find((obj) => {
        return obj.key === m.target;
      });
      const targetIndex = primativeArray.findIndex((obj) => {
        return obj.key === m.target;
      });
      const targetEntry = this.components[source.component].target.find(
        (obj) => {
          return obj.target === target.component;
        }
      );
      const Elastic = components[targetEntry.elastic].class;
      const elastic = new Elastic(
        at(source.out, targetEntry.sourceOut),
        at(target.out, targetEntry.targetOut),
        {
          angle: this.mecano.state.angle,
          sourceParams: source.params,
          targetParams: target.params,
        }
      );
      elastic.component = targetEntry.elastic;
      elastic.key = uuidv4();
      elastic.type = 'elastic';
      elastic.draw();
      primativeArray.splice(targetIndex, 0, elastic);
    });
  }
  /**
   * Processes a given node.
   * 1. Set visited.
   * 2. Set level and position.
   * 3. Convert to primative and push to outputData.
   * @param  {Object} node Node from inputData.
   * @param  {number} levelX Graph level X as per traverse function.
   * @param  {number} levelY Graph level Y as per traverse function.
   * @param  {Array} outputData Array to push primatives to.
   * @param  {Object} unit - Global unit size - should be square {X:5,Y:5}.
   */
  processNode(node, levelX, levelY, outputData, unit) {
    node.visited = true;
    node.level = {X: levelX, Y: levelY};
    this.setPosition(node);
    outputData.push(this.getPrimative(node, unit));
  }
  /**
   * Traverses the graph using breadth first.
   * 0. Calculate global unit size.
   * 1. Set all visited to false
   * 2. Make a queue and add root node to it.
   * 3. Set counters.
   * 4. Loop through queue while queue is not empty.
   * 5. If node not visisted, process it and get its children.
   * 6. Adjust counters if moving horizontally to a new levelX or just
   * vertically to a new levelY.
   * 7. Add children to queue if not visited.
   * 8. Add elastics to outputData if more 2 or more primatives exist.
   * @todo No tags for now.
   * @return {Array} An ordered array of primatives and elastics.
   */
  traverse() {
    const unit = this.calculateUnit();
    console.log(unit);
    let outputData = [];
    this.setVisited(false);
    let queue = [];
    this.setRootNode();
    queue.push(this.rootNode);
    let levelX = 0;
    let levelY = 0;
    let unitsToDepthIncrease = 1;
    let nextunitsToDepthIncrease = 0;
    do {
      let x = queue.shift();
      if (x.visited === false) {
        this.processNode(x, levelX, levelY, outputData, unit);
        let getChildren = this.getChildren(x);
        nextunitsToDepthIncrease += getChildren.length;
        if (--unitsToDepthIncrease === 0) {
          unitsToDepthIncrease = nextunitsToDepthIncrease;
          nextunitsToDepthIncrease = 0;
          levelX++;
          levelY = 0;
        } else {
          levelY++;
        }
        getChildren.forEach((m, index) => {
          if (m.visited === false) {
            queue.push(m);
          }
        });
      }
    } while (queue.length !== 0);
    console.log(outputData);
    // if (outputData.length > 1) {
    //   this.getElastics(outputData);
    // }
    return outputData;
  }
}
