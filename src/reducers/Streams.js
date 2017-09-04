import FreehandStream from '../elements/streams/FreehandStream';
import CircularStream from '../elements/streams/CircularStream';
import LinearStream from '../elements/streams/LinearStream';
import _ from 'lodash';
import { streams } from '../config/initial-state';

const addFreehandStream = (state, position, event) => {
  let stream = new FreehandStream({position});
  let streamList = state.splice(0);
  streamList.push(stream);
  stream.onMouseDown(event);
  return streamList;
};

const addCircularStream = (state, position, event) => {
  let stream = new CircularStream({position});
  let streamList = state.splice(0);
  streamList.push(stream);
  stream.onMouseDown(event);
  return streamList;
};

const addLinearStream = (state, position, event) => {
  let stream = new LinearStream({position});
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

const setStreamSpeed = (state, id, speed) => {
  return state.map((stream) => {
    if (stream.id === id) {
      stream.speed = speed;
    }
    return stream;
  });
};

const setStreamCount = (state, id, count) => {
  return state.map((stream) => {
    if (stream.id === id) {
      stream.count = count;
    }
    return stream;
  });
};

const updateSelectedStreamPositionByDelta = (state, dx, dy) => {
  return state.map((stream) => {
    if (stream.selected) {
      stream.position = [stream.position[0] + dx, stream.position[1] + dy];
    }
    return stream;
  });
};

const updateStreamPositionByDelta = (state, dx, dy) => {
  return state.map((stream) => {
    stream.position = [stream.position[0] + dx, stream.position[1] + dy];
    stream.particles = stream.particles.map((particle) => {
      particle.position = [particle.position[0] + dx, particle.position[1] + dy];
      return particle;
    });
    return stream;
  });
};

const createStream = (stream) => {
  switch (stream.topLevel.variety) {
    case 'circular':
      return new CircularStream(stream.topLevel);
    case 'linear':
      return new LinearStream(stream.topLevel);
    case 'freehand':
      return new FreehandStream(stream.topLevel);
    default:
      return null;
  }
};

const hydrateStreams = (state, payload) => {
  return payload.map((stream) => {
    return createStream(stream);
  });
};

export default (state = streams, action) => {
  switch (action.type) {

    case 'ADD_FREEHAND_STREAM':
      return addFreehandStream(state, action.position, action.event);

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

    case 'SET_STREAM_SPEED':
      return setStreamSpeed(state, action.id, action.speed);

    case 'SET_STREAM_COUNT':
      return setStreamCount(state, action.id, action.count);

    case 'UPDATE_SELECTED_STREAM_POSITION_BY_DELTA':
      return updateSelectedStreamPositionByDelta(state, action.dx, action.dy);

    case 'UPDATE_STREAM_POSITION_BY_DELTA':
      return updateStreamPositionByDelta(state, action.dx, action.dy);

    case 'HYDRATE_STREAMS':
      return hydrateStreams(state, action.payload);

    default:
      return state;
  }
};
