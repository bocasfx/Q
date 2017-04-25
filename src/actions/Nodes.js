export const addSynthNode = (position) => {
  return {
    type: 'ADD_SYNTH_NODE',
    position
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

export const cloneNode = (id) => {
  return {
    type: 'CLONE_NODE',
    id
  };
};

export const setNodeAttack = (id, value) => {
  return {
    type: 'SET_NODE_ATTACK',
    id,
    value
  };
};

export const setNodeRelease = (id, value) => {
  return {
    type: 'SET_NODE_RELEASE',
    id,
    value
  };
};

export const setNodeName = (id, name) => {
  return {
    type: 'SET_NODE_NAME',
    id,
    name
  };
};

export const setNodeDisabledStatus = (id, status) => {
  return {
    type: 'SET_NODE_DISABLED_STATUS',
    id,
    status
  };
};

export const setNodePan = (id, pan) => {
  return {
    type: 'SET_NODE_PAN',
    id,
    pan
  };
};

export const linkNodes = (srcId, destId) => {
  return {
    type: 'LINK_NODES',
    srcId,
    destId
  };
};

export const enqueueParticle = (id, particleId) => {
  return {
    type: 'ENQUEUE_PARTICLE',
    id,
    particleId
  };
};

export const dequeueParticle = (id, particleId) => {
  return {
    type: 'DEQUEUE_PARTICLE',
    id,
    particleId
  };
};

export const playNode = (id) => {
  return {
    type: 'PLAY_NODE',
    id
  };
};

export const stopNode = (id) => {
  return {
    type: 'STOP_NODE',
    id
  };
};

export const setNodeDelay = (id, delay) => {
  return {
    type: 'SET_NODE_DELAY',
    id,
    delay
  };
};
