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
