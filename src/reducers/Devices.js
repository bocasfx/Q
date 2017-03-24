const initialState = {
  streams: true,
  nodes: false,
  settings: false
};

const toggleDevice = (state, device) => {
  let newState = state;
  let deviceValue = state[device];
  Object.keys(state).forEach((key) => {
    newState[key] = false;
  });
  newState[device] = !deviceValue;
  return Object.assign({}, state, newState);
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_DEVICE':
      return toggleDevice(state, action.device);
    default:
      return state;
  }
};
