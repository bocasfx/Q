import { notifications } from '../config/initial-state';

const showToaster = (state, message, level) => {
  let newState = {
    message,
    level,
    hidden: false
  };
  return Object.assign({}, state, newState);
};

const hideToaster = (state) => {
  let newState = {
    message: '',
    level: 'info',
    hidden: true
  };
  return Object.assign({}, state, newState);
};

export default (state = notifications, action) => {
  switch (action.type) {
    case 'SHOW_TOASTER':
      return showToaster(state, action.message, action.level);
    case 'HIDE_TOASTER':
      return hideToaster(state);
    default:
      return state;
  }
};
