export const hydrationStarted = () => {
  return {
    type: 'HYDRATION_STARTED'
  };
};

export const hydrationComplete = () => {
  return {
    type: 'HYDRATION_COMPLETE'
  };
};

export const setWindowSize = (width, height) => {
  return {
    type: 'SET_WINDOW_SIZE',
    width,
    height
  };
};

export const setDirtyStatus = (status) => {
  return {
    type: 'SET_DIRTY_STATUS',
    status
  };
};

export const setVisualizer = (vizType) => {
  return {
    type: 'SET_VISUALIZER',
    vizType
  };
};
