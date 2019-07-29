import initialState from '../config/initial-state';
const { app } = initialState;

const hydrationStarted = state => {
  let newState = Object.assign({}, state, { hydrating: true });
  return newState;
};

const hydrationComplete = state => {
  let newState = Object.assign({}, state, { hydrating: false });
  return newState;
};

const setWindowSize = (state, width, height) => {
  let newState = Object.assign({}, state, { width, height });
  return newState;
};

const setDirtyStatus = (state, status) => {
  let newState = Object.assign({}, state, { dirty: status });
  return newState;
};

export default (state = app, action) => {
  switch (action.type) {
  case 'HYDRATION_STARTED':
    return hydrationStarted(state);

  case 'HYDRATION_COMPLETE':
    return hydrationComplete(state);

  case 'SET_WINDOW_SIZE':
    return setWindowSize(state, action.width, action.height);

  case 'SET_DIRTY_STATUS':
    return setDirtyStatus(state, action.status);

  default:
    return state;
  }
};
