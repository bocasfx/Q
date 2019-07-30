export const toggleTransport = () => {
  return {
    type: 'TOGGLE_TRANSPORT',
  };
};

export const updateFPSCount = (count) => {
  return {
    type: 'UPDATE_FPS_COUNT',
    count,
  };
};
