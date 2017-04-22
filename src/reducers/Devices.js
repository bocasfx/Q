import { Devices } from '../config/initial-state';

const toggleDevice = (state, device) => {
  let newState = Object.assign({}, state, {});
  let deviceValue = newState[device];
  Object.keys(newState).forEach((key) => {
    newState[key] = false;
  });
  newState[device] = !deviceValue;
  return newState;
};

export default (state = Devices, action) => {
  switch (action.type) {

    case 'TOGGLE_DEVICE':
      return toggleDevice(state, action.device);

    default:
      return state;
  }
};
