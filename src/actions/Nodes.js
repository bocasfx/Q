export const addNode = (position, audioContext) => {
  return {
    type: 'ADD_NODE',
    position,
    audioContext
  };
};

export const addMidiNode = (position, midiContext) => {
  return {
    type: 'ADD_MIDI_NODE',
    position,
    midiContext
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

export const setNodePosition = (id, position) => {
  return {
    type: 'SET_NODE_POSITION',
    id,
    position
  };
};

export const setNodeFrequency = (id, frequency) => {
  return {
    type: 'SET_NODE_FREQUENCY',
    id,
    frequency
  };
};

export const setNodeStatus = (id, status) => {
  return {
    type: 'SET_NODE_STATUS',
    id,
    status
  };
};
