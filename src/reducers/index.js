import { combineReducers } from 'redux';
import Devices from './Devices';
import Nodes from './Nodes';
import Streams from './Streams';
import Selection from './Selection';
import initialState from '../config/initial-state';
import SynthNode from '../elements/SynthNode';

const reducers = combineReducers({
  Devices,
  Nodes,
  Streams,
  Selection
});

const createNode = (node) => {
  switch (node.type) {
    case 'synth':
      return new SynthNode(node.position);
    default:
      return new Node();
  }
};

const hydrateState = (payload) => {
  let nodes = payload.Nodes.map((node) => {
    let newNode = createNode(node);
    let extendedNode = Object.assign({}, newNode, node);
    extendedNode.render = newNode.render;
    extendedNode.nodeImg = newNode.nodeImg;
    extendedNode.activeNodeImg = newNode.activeNodeImg;
    extendedNode.selectedNodeImg = newNode.selectedNodeImg;
    extendedNode.volume = newNode.volume;
    return extendedNode;
  });

  return Object.assign({}, payload, {Nodes: nodes});
};

const mainReducer = (state = initialState, action) => {
  return action.type === 'HYDRATE_STATE' ? hydrateState(action.payload) : reducers(state, action);
};

export default mainReducer;