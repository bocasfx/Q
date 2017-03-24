import Stream from '../elements/Stream';

const initialState = [];

const addStream = (state, position, event) => {
  let stream = new Stream(position);
  let streamList = state.splice(0);
  streamList.push(stream);
  stream.onMouseDown(event);
  return streamList;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_STREAM':
      return addStream(state, action.position, action.event);
    default:
      return state;
  }
};
