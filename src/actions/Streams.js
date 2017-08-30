export const addFreehandStream = (position, event) => {
  return {
    type: 'ADD_FREEHAND_STREAM',
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

export const addLinearStream = (position, event) => {
  return {
    type: 'ADD_LINEAR_STREAM',
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

export const setStreamSpeed = (id, speed) => {
  return {
    type: 'SET_STREAM_SPEED',
    id,
    speed
  };
};

export const setStreamCount = (id, count) => {
  return {
    type: 'SET_STREAM_COUNT',
    id,
    count
  };
};

export const updateSelectedStreamPositionByDelta = (dx, dy) => {
  return {
    type: 'UPDATE_SELECTED_STREAM_POSITION_BY_DELTA',
    dx,
    dy
  };
};

export const updateStreamPositionByDelta = (dx, dy) => {
  return {
    type: 'UPDATE_STREAM_POSITION_BY_DELTA',
    dx,
    dy
  };
};
