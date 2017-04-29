import Stream from '../elements/Stream';
import CircularStream from '../elements/CircularStream';
import LinearStream from '../elements/LinearStream';
import _ from 'lodash';
import { streams } from '../config/initial-state';

const addStream = (state, position, event) => {
  let stream = new Stream(position);
  let streamList = state.splice(0);
  streamList.push(stream);
  stream.onMouseDown(event);
  return streamList;
};

const addCircularStream = (state, position, event) => {
  let stream = new CircularStream(position);
  let streamList = state.splice(0);
  streamList.push(stream);
  stream.onMouseDown(event);
  return streamList;
};

const addLinearStream = (state, position, event) => {
  let stream = new LinearStream(position);
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

const setStreamName = (state, id, name) => {
  return state.map((stream) => {
    if (stream.id === id) {
      stream.name = name;
    }
    return stream;
  });
};

const setStreamDisabledStatus = (state, id, status) => {
  return state.map((stream) => {
    if (stream.id === id) {
      stream.disabled = status;
    }
    return stream;
  });
};

export default (state = streams, action) => {
  switch (action.type) {

    case 'ADD_STREAM':
      return addStream(state, action.position, action.event);

    case 'ADD_CIRCULAR_STREAM':
      return addCircularStream(state, action.position, action.event);

    case 'ADD_LINEAR_STREAM':
      return addLinearStream(state, action.position, action.event);

    case 'DELETE_STREAM':
      return deleteStream(state, action.id);

    case 'SELECT_STREAM':
      return selectStream(state, action.id);

    case 'SET_STREAM_NAME':
      return setStreamName(state, action.id, action.name);

    case 'SET_STREAM_DISABLED_STATUS':
      return setStreamDisabledStatus(state, action.id, action.status);

    default:
      return state;
  }
};
