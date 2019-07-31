import initialState from '../config/initial-state';
const { transport } = initialState;

const toggleTransport = state => {
  let newState = Object.assign({}, state, {});
  newState.playing = !newState.playing;
  return newState;
};

const updateFPSCount = (state, count) => {
  let newState = Object.assign({}, state, {});
  newState.fpsCount = count;
  return newState;
};

export default (state = transport, action) => {
  switch (action.type) {
    case 'TOGGLE_TRANSPORT':
      return toggleTransport(state);

    case 'UPDATE_FPS_COUNT':
      return updateFPSCount(state, action.count);

    default:
      return state;
  }
};
