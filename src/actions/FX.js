export const setDelayTime = (value) => {
  return {
    type: 'SET_DELAY_TIME',
    value
  };
};

export const setDelayFeedback = (value) => {
  return {
    type: 'SET_DELAY_FEEDBACK',
    value
  };
};

export const setDelayCutoffFrequency = (value) => {
  return {
    type: 'SET_DELAY_CUTOFF_FREQUENCY',
    value
  };
};

export const setFilterCutoffFrequency = (value) => {
  return {
    type: 'SET_FILTER_CUTOFF_FREQUENCY',
    value
  };
};

export const setFilterQ = (value) => {
  return {
    type: 'SET_FILTER_Q',
    value
  };
};

export const setFilterAttack = (value) => {
  return {
    type: 'SET_FILTER_ATTACK',
    value
  };
};

export const setWaveShaperAmount = (value) => {
  return {
    type: 'SET_WAVE_SHAPER_AMOUNT',
    value
  };
};

export const setReverbAmount = (value) => {
  return {
    type: 'SET_REVERB_AMOUNT',
    value
  };
};
