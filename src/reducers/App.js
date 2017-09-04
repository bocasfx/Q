import { app } from '../config/initial-state';

const hydrationStarted = (state) => {
  let newState = Object.assign({}, state, {hydrating: true});
  return newState;
};

const hydrationComplete = (state) => {
  let newState = Object.assign({}, state, {hydrating: false});
  return newState;
};

export default (state = app, action) => {
  switch (action.type) {

    case 'HYDRATION_STARTED':
      return hydrationStarted(state);

    case 'HYDRATION_COMPLETE':
      return hydrationComplete(state);

    default:
      return state;
  }
};
