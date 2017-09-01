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

const setFilterQ = (state, value) => {
  let newFilter = Object.assign({}, state.filter, { q: value }); 
  return Object.assign({}, state, {filter: newFilter});
};

const setFilterAttack = (state, value) => {
  let newFilter = Object.assign({}, state.filter, { attack: value }); 
  return Object.assign({}, state, {filter: newFilter});
};

const setWaveShaperAmount = (state, value) => {
  let newFilter = Object.assign({}, state.waveShaper, { amount: value }); 
  return Object.assign({}, state, {waveShaper: newFilter});
};

const setReverbAmount = (state, value) => {
  let newFilter = Object.assign({}, state.reverb, { amount: value }); 
  return Object.assign({}, state, {reverb: newFilter});
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

    case 'SET_FILTER_Q':
      return setFilterQ(state, action.value);

    case 'SET_FILTER_ATTACK':
      return setFilterAttack(state, action.value);

    case 'SET_WAVE_SHAPER_AMOUNT':
      return setWaveShaperAmount(state, action.value);

    case 'SET_REVERB_AMOUNT':
      return setReverbAmount(state, action.value);

    default:
      return state;
  }
};
