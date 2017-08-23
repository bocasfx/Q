import { transport } from '../config/initial-state';

const toggleTransport = (state) => {
  let newState = Object.assign({}, state, {});
  newState.playing = !newState.playing;
  return newState;
};

export default (state = transport, action) => {
  switch (action.type) {

    case 'TOGGLE_TRANSPORT':
      return toggleTransport(state);

    default:
      return state;
  }
};
