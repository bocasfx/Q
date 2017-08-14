import { fx } from '../config/initial-state';

const setDelayTime = (state, value) => {
  let newDelay = Object.assign({}, state.delay, { time: value }); 
  return Object.assign({}, state, {delay: newDelay});
};

const setDelayFeedback = (state, value) => {
  let newDelay = Object.assign({}, state.delay, { feedback: value }); 
  return Object.assign({}, state, {delay: newDelay});
};

const setDelayCutoffFrequency = (state, value) => {
  let newDelay = Object.assign({}, state.delay, { cutoffFrequency: value }); 
  return Object.assign({}, state, {delay: newDelay});
};

const setFilterCutoffFrequency = (state, value) => {
  let newFilter = Object.assign({}, state.filter, { cutoffFrequency: value }); 
  return Object.assign({}, state, {filter: newFilter});
};

const setFilterDetune = (state, value) => {
  let newFilter = Object.assign({}, state.filter, { detune: value }); 
  return Object.assign({}, state, {filter: newFilter});
};

const setFilterQ = (state, value) => {
  let newFilter = Object.assign({}, state.filter, { q: value }); 
  return Object.assign({}, state, {filter: newFilter});
};

const setFilterAttack = (state, value) => {
  let newFilter = Object.assign({}, state.filter, { attack: value }); 
  return Object.assign({}, state, {filter: newFilter});
};

const setFilterRelease = (state, value) => {
  let newFilter = Object.assign({}, state.filter, { release: value }); 
  return Object.assign({}, state, {filter: newFilter});
};

export default (state = fx, action) => {
  switch (action.type) {

    case 'SET_DELAY_TIME':
      return setDelayTime(state, action.value);

    case 'SET_DELAY_FEEDBACK':
      return setDelayFeedback(state, action.value);

    case 'SET_DELAY_CUTOFF_FREQUENCY':
      return setDelayCutoffFrequency(state, action.value);

    case 'SET_FILTER_CUTOFF_FREQUENCY':
      return setFilterCutoffFrequency(state, action.value);

    case 'SET_FILTER_DETUNE':
      return setFilterDetune(state, action.value);

    case 'SET_FILTER_Q':
      return setFilterQ(state, action.value);

    case 'SET_FILTER_ATTACK':
      return setFilterAttack(state, action.value);

    case 'SET_FILTER_RELEASE':
      return setFilterRelease(state, action.value);

    default:
      return state;
  }
};
