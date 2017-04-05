const initialState = {
  streams: true,
  synthNodes: false,
  midiNodes: false,
  audioNodes: false,
  settings: false,
  nodeSettings: false,
  nodeSettingsId: null,
  mixer: false
};

const toggleDevice = (state, device) => {
  let newState = Object.assign({}, state, {});
  let deviceValue = newState[device];
  Object.keys(newState).forEach((key) => {
    newState[key] = false;
  });
  newState[device] = !deviceValue;
  return newState;
};

export default (state = initialState, action) => {
  switch (action.type) {

    case 'TOGGLE_DEVICE':
      return toggleDevice(state, action.device);

    default:
      return state;
  }
};
