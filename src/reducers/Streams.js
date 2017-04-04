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
  let streamList = state.splice(0);
  return _.remove(streamList, (stream) => {
    return stream.id !== id;
  });
};

const selectStream = (state, id) => {
  return state.map((stream) => {
    stream.selected = stream.id === id ? !stream.selected : false;
    return stream;
  });
};

export default (state = initialState, action) => {
  switch (action.type) {

    case 'ADD_STREAM':
      return addStream(state, action.position, action.event);

    case 'DELETE_STREAM':
      return deleteStream(state, action.id);

    case 'SELECT_STREAM':
      return selectStream(state, action.id);

    default:
      return state;
  }
};
