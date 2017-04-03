import Stream from '../elements/Stream';
import _ from 'lodash';

const initialState = [];

const addStream = (state, position, event) => {
  let stream = new Stream(position);
  let streamList = state.splice(0);
  streamList.push(stream);
  stream.onMouseDown(event);
  return streamList;
};

const deleteStream = (state, id) => {
  console.log(state);
  let streamList = state.splice(0);
  let newList = _.remove(streamList, (stream) => {
    return stream.id !== id;
  });
  console.log(newList);
  return newList;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_STREAM':
      return addStream(state, action.position, action.event);
    case 'DELETE_STREAM':
      return deleteStream(state, action.id);
    default:
      return state;
  }
};
