import initialState from '../config/initial-state';
const { devices } = initialState;

const toggleDevice = (state, device) => {
  let newState = Object.assign({}, state, {});
  Object.keys(newState).forEach(key => {
    newState[key] = false;
  });
  newState[device] = true;
  return newState;
};

export default (state = devices, action) => {
  switch (action.type) {
    case 'TOGGLE_DEVICE':
      return toggleDevice(state, action.device);

    default:
      return state;
  }
};
