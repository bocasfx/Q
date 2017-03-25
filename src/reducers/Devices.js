const initialState = {
  streams: true,
  nodes: false,
  midiNodes: false,
  settings: false,
  nodeSettings: false,
  nodeSettingsId: null
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

const showNodeSettings = (state, id) => {
  let newState = Object.assign({}, state, {});
  Object.keys(newState).forEach((key) => {
    newState[key] = false;
  });
  newState.nodeSettings = true;
  newState.nodeSettingsId = id;
  return newState;
};

const hideNodeSettings = (state) => {
  let newState = Object.assign({}, state, {});
  newState.nodeSettings = false;
  newState.nodeSettingsId = null;
  return newState;
};

export default (state = initialState, action) => {
  switch (action.type) {

    case 'TOGGLE_DEVICE':
      return toggleDevice(state, action.device);

    case 'SHOW_NODE_SETTINGS':
      return showNodeSettings(state, action.id);

    case 'HIDE_NODE_SETTINGS':
      return hideNodeSettings(state, action.id);

    default:
      return state;
  }
};
