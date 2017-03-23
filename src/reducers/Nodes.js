import Node from '../elements/Node';

const initialState = {
  list: []
};

const addNode = (state, position) => {
  let node = new Node(position);
  let nodeList = state.list;
  nodeList.push(node);
  return Object.assign({}, state, {list: nodeList});
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_NODE':
      return addNode(state, action.position);
    default:
      return state;
  }
};
