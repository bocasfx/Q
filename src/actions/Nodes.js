export const addMidiNode = (position, relay = false, id = null) => {
  return {
    type: 'ADD_MIDI_NODE',
    position,
    relay,
    id,
  };
};

export const setNodeSource = (id, buffer, path) => {
  return {
    type: 'SET_NODE_SOURCE',
    id,
    buffer,
    path,
  };
};

export const deleteNode = id => {
  return {
    type: 'DELETE_NODE',
    id,
  };
};

export const deleteAllNodes = () => {
  return {
    type: 'DELETE_ALL_NODES',
  };
};

export const deleteSelectedNodes = () => {
  return {
    type: 'DELETE_SELECTED_NODES',
  };
};

export const unlinkSelectedNodes = () => {
  return {
    type: 'UNLINK_SELECTED_NODES',
  };
};

export const selectNode = id => {
  return {
    type: 'SELECT_NODE',
    id,
  };
};

export const deselectNodes = () => {
  return {
    type: 'DESELECT_NODES',
  };
};

export const selectAllNodes = () => {
  return {
    type: 'SELECT_ALL_NODES',
  };
};

export const cloneNode = id => {
  return {
    type: 'CLONE_NODE',
    id,
  };
};

export const setNodeName = (id, name) => {
  return {
    type: 'SET_NODE_NAME',
    id,
    name,
  };
};

export const setNodeDisabledStatus = (id, status) => {
  return {
    type: 'SET_NODE_DISABLED_STATUS',
    id,
    status,
  };
};

export const linkNodes = (srcId, destId) => {
  return {
    type: 'LINK_NODES',
    srcId,
    destId,
  };
};

export const unlinkNodes = (srcId, destId) => {
  return {
    type: 'UNLINK_NODES',
    srcId,
    destId,
  };
};

export const unlinkNode = id => {
  return {
    type: 'UNLINK_NODE',
    id,
  };
};

export const enqueueParticle = (id, particleId) => {
  return {
    type: 'ENQUEUE_PARTICLE',
    id,
    particleId,
  };
};

export const dequeueParticle = (id, particleId) => {
  return {
    type: 'DEQUEUE_PARTICLE',
    id,
    particleId,
  };
};

export const dequeueParticles = () => {
  return {
    type: 'DEQUEUE_PARTICLES',
  };
};

export const playNode = id => {
  return {
    type: 'PLAY_NODE',
    id,
  };
};

export const stopNode = id => {
  return {
    type: 'STOP_NODE',
    id,
  };
};

export const stopNodes = () => {
  return {
    type: 'STOP_NODES',
  };
};

export const stopSelectedNodes = () => {
  return {
    type: 'STOP_SELECTED_NODES',
  };
};

export const setNodeLag = (id, lag) => {
  return {
    type: 'SET_NODE_LAG',
    id,
    lag,
  };
};

export const setNodeProbability = (id, probability) => {
  return {
    type: 'SET_NODE_PROBABILITY',
    id,
    probability,
  };
};

export const setNodeVelocity = (id, value) => {
  return {
    type: 'SET_NODE_VELOCITY',
    id,
    value,
  };
};

export const setNodeNote = (id, value) => {
  return {
    type: 'SET_NODE_NOTE',
    id,
    value,
  };
};

export const setNodeChannel = (id, value) => {
  return {
    type: 'SET_NODE_CHANNEL',
    id,
    value,
  };
};

export const setNodeOctave = (id, value) => {
  return {
    type: 'SET_NODE_OCTAVE',
    id,
    value,
  };
};

export const updateSelectedNodePositionByDelta = (dx, dy) => {
  return {
    type: 'UPDATE_SELECTED_NODE_POSITION_BY_DELTA',
    dx,
    dy,
  };
};

export const updateNodePositionByDelta = (dx, dy) => {
  return {
    type: 'UPDATE_NODE_POSITION_BY_DELTA',
    dx,
    dy,
  };
};

export const hydrateNodes = payload => {
  return {
    type: 'HYDRATE_NODES',
    payload,
  };
};

export const setNodeMidiOutput = (id, outputId) => {
  return {
    type: 'SET_NODE_MIDI_OUTPUT',
    id,
    outputId,
  };
};
