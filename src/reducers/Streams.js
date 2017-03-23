import Stream from '../elements/Stream';

const initialState = {
  list: []
};

const addStream = (state, position, event) => {
  let stream = new Stream(position);
  let streamList = state.list;
  streamList.push(stream);
  stream.onMouseDown(event);
  return Object.assign({}, state, {list: streamList});
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_STREAM':
      return addStream(state, action.position, action.event);
    default:
      return state;
  }
};
