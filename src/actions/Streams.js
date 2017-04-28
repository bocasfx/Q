export const addStream = (position, event) => {
  return {
    type: 'ADD_STREAM',
    position,
    event
  };
};

export const addCircularStream = (position, event) => {
  return {
    type: 'ADD_CIRCULAR_STREAM',
    position,
    event
  };
};

export const deleteStream = (id) => {
  return {
    type: 'DELETE_STREAM',
    id
  };
};

export const selectStream = (id) => {
  return {
    type: 'SELECT_STREAM',
    id
  };
};

export const setStreamName = (id, name) => {
  return {
    type: 'SET_STREAM_NAME',
    id,
    name
  };
};

export const setStreamDisabledStatus = (id, status) => {
  return {
    type: 'SET_STREAM_DISABLED_STATUS',
    id,
    status
  };
};
