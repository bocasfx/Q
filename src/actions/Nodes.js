export const addNode = (position, audioContext) => {
  return {
    type: 'ADD_NODE',
    position,
    audioContext
  };
};

export const detectCollisions = (streams) => {
  return {
    type: 'DETECT_COLLISIONS',
    streams
  };
};

export const detectDoubleClick = (position) => {
  return {
    type: 'DETECT_DOUBLE_CLICK',
    position
  };
};
