export const addSynthNode = (position, audioContext) => {
  return {
    type: 'ADD_SYNTH_NODE',
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

export const addAudioNode = (position) => {
  return {
    type: 'ADD_AUDIO_NODE',
    position
  };
};

export const detectCollisions = (streams) => {
  return {
    type: 'DETECT_COLLISIONS',
    streams
  };
};

export const setNodePosition = (id, position) => {
  return {
    type: 'SET_NODE_POSITION',
    id,
    position
  };
};

export const setNodeOsc1Frequency = (id, frequency) => {
  return {
    type: 'SET_NODE_OSC1_FREQUENCY',
    id,
    frequency
  };
};

export const setNodeOsc2Frequency = (id, frequency) => {
  return {
    type: 'SET_NODE_OSC2_FREQUENCY',
    id,
    frequency
  };
};

export const setNodeVolume = (id, volume) => {
  return {
    type: 'SET_NODE_VOLUME',
    id,
    volume
  };
};

export const setNodeSource = (id, path) => {
  return {
    type: 'SET_NODE_SOURCE',
    id,
    path
  };
};

export const deleteNode = (id) => {
  return {
    type: 'DELETE_NODE',
    id
  };
};

export const selectNode = (id) => {
  return {
    type: 'SELECT_NODE',
    id
  };
};

export const deselectNodes = () => {
  return {
    type: 'DESELECT_NODES'
  };
};

export const setNodeOsc1WaveType = (id, waveType) => {
  return {
    type: 'SET_NODE_OSC1_WAVE_TYPE',
    id,
    waveType
  };
};

export const setNodeOsc2WaveType = (id, waveType) => {
  return {
    type: 'SET_NODE_OSC2_WAVE_TYPE',
    id,
    waveType
  };
};
