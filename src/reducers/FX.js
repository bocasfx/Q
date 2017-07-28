import { fx } from '../config/initial-state';

const setDelayTime = (state, value) => {
  let newDelay = Object.assign({}, state.delay, { time: value }); 
  return Object.assign({}, state, {delay: newDelay});
};

const setDelayFeedback = (state, value) => {
  let newDelay = Object.assign({}, state.delay, { feedback: value }); 
  return Object.assign({}, state, {delay: newDelay});
};

const setDelayCutoff = (state, value) => {
  let newDelay = Object.assign({}, state.delay, { cutoff: value }); 
  return Object.assign({}, state, {delay: newDelay});
};

export default (state = fx, action) => {
  switch (action.type) {

    case 'SET_DELAY_TIME':
      return setDelayTime(state, action.value);

    case 'SET_DELAY_FEEDBACK':
      return setDelayFeedback(state, action.value);

    case 'SET_DELAY_CUTOFF':
      return setDelayCutoff(state, action.value);

    default:
      return state;
  }
};
