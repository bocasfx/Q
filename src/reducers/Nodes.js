import SynthNode from '../elements/SynthNode';
import MidiNode from '../elements/MidiNode';
import AudioNode from '../elements/AudioNode';
import _ from 'lodash';
import { Nodes } from '../config/initial-state';

const addSynthNode = (state, position) => {
  let node = new SynthNode(position);
  let nodeList = state.splice(0);
  nodeList.push(node);
  return nodeList;
};

const addMidiNode = (state, position, midiContext) => {
  let midiNode = new MidiNode(position, midiContext);
  let nodeList = state.splice(0);
  nodeList.push(midiNode);
  return nodeList;
};

const addAudioNode = (state, position) => {
  let audioNode = new AudioNode(position);
  let nodeList = state.splice(0);
  nodeList.push(audioNode);
  return nodeList;
};

const setNodePosition = (state, id, position) => {
  return state.map((node) => {
    if (node.id === id) {
      node.position = position;
    }
    return node;
  });
};

const setNodeOsc1Frequency = (state, id, frequency) => {
  return state.map((node) => {
    if (node.id === id) {
      node.osc1Freq = frequency;
    }
    return node;
  });
};

const setNodeOsc2Frequency = (state, id, frequency) => {
  return state.map((node) => {
    if (node.id === id) {
      node.osc2Freq = frequency;
    }
    return node;
  });
};

const setNodeVolume = (state, id, volume) => {
  return state.map((node) => {
    if (node.id === id) {
      node.volume = volume;
    }
    return node;
  });
};

const setNodeSource = (state, id, path) => {
  return state.map((node) => {
    if (node.id === id) {
      node.src = path;
    }
    return node;
  });
};

const deleteNode = (state, id) => {
  let nodeList = state.splice(0);
  return _.remove(nodeList, (node) => {
    return node.id !== id;
  });
};

const selectNode = (state, id) => {
  return state.map((node) => {
    node.selected = node.id === id ? !node.selected : false;
    return node;
  });
};

const deselectNodes = (state) => {
  return state.map((node) => {
    node.selected = false;
    return node;
  });
};

const setNodeOsc1WaveType = (state, id, waveType) => {
  return state.map((node) => {
    if (node.id === id) {
      node.osc1WaveType = waveType;
    }
    return node;
  });
};

const setNodeOsc2WaveType = (state, id, waveType) => {
  return state.map((node) => {
    if (node.id === id) {
      node.osc2WaveType = waveType;
    }
    return node;
  });
};

const cloneNode = (state, id) => {
  console.log(state);
  
};

const setNodeAttack = (state, id, value) => {
  return state.map((node) => {
    if (node.id === id) {
      node.attack = value;
    }
    return node;
  });
};

const setNodeRelease = (state, id, value) => {
  return state.map((node) => {
    if (node.id === id) {
      node.release = value;
    }
    return node;
  });
};

const setNodeName = (state, id, name) => {
  return state.map((node) => {
    if (node.id === id) {
      node.name = name;
    }
    return node;
  });
};

const setNodeDisabledStatus = (state, id, status) => {
  return state.map((node) => {
    if (node.id === id) {
      node.disabled = status;
    }
    return node;
  });
};

const setNodePan = (state, id, pan) => {
  return state.map((node) => {
    if (node.id === id) {
      node.pan = pan;
    }
    return node;
  });
};

const linkNodes = (state, srcId, destId) => {
  let srcNode = _.find(state, (node) => {
    return node.id === srcId;
  });
  let destNode = _.find(state, (node) => {
    return node.id === destId;
  });
  srcNode.link(destNode);
  return state;
};

const enqueueParticle = (state, nodeId, particleId) => {
  return state.map((node) => {
    if (node.id === nodeId) {
      node.enqueueParticle(particleId);
    }
    return node;
  });
};

const dequeueParticle = (state, nodeId, particleId) => {
  return state.map((node) => {
    if (node.id === nodeId) {
      node.dequeueParticle(particleId);
    }
    return node;
  });
};

const playNode = (state, nodeId) => {
  return state.map((node) => {
    if (node.id === nodeId) {
      node.play();
    }
    return node;
  });
};

const stopNode = (state, nodeId) => {
  return state.map((node) => {
    if (node.id === nodeId) {
      node.stop();
    }
    return node;
  });
};

export default (state = Nodes, action) => {
  switch (action.type) {

    case 'ADD_SYNTH_NODE':
      return addSynthNode(state, action.position);

    case 'ADD_MIDI_NODE':
      return addMidiNode(state, action.position, action.midiContext);

    case 'ADD_AUDIO_NODE':
      return addAudioNode(state, action.position, action.midiContext);

    case 'SET_NODE_POSITION':
      return setNodePosition(state, action.id, action.position);

    case 'SET_NODE_OSC1_FREQUENCY':
      return setNodeOsc1Frequency(state, action.id, action.frequency);

    case 'SET_NODE_OSC2_FREQUENCY':
      return setNodeOsc2Frequency(state, action.id, action.frequency);

    case 'SET_NODE_VOLUME':
      return setNodeVolume(state, action.id, action.volume);

    case 'SET_NODE_SOURCE':
      return setNodeSource(state, action.id, action.path);

    case 'DELETE_NODE':
      return deleteNode(state, action.id);

    case 'SELECT_NODE':
      return selectNode(state, action.id);

    case 'DESELECT_NODES':
      return deselectNodes(state);

    case 'SET_NODE_OSC1_WAVE_TYPE':
      return setNodeOsc1WaveType(state, action.id, action.waveType);

    case 'SET_NODE_OSC2_WAVE_TYPE':
      return setNodeOsc2WaveType(state, action.id, action.waveType);

    case 'CLONE_NODE':
      return cloneNode(state, action.id);

    case 'SET_NODE_ATTACK':
      return setNodeAttack(state, action.id, action.value);

    case 'SET_NODE_RELEASE':
      return setNodeRelease(state, action.id, action.value);

    case 'SET_NODE_NAME':
      return setNodeName(state, action.id, action.name);

    case 'SET_NODE_DISABLED_STATUS':
      return setNodeDisabledStatus(state, action.id, action.status);

    case 'SET_NODE_PAN':
      return setNodePan(state, action.id, action.pan);

    case 'LINK_NODES':
      return linkNodes(state, action.srcId, action.destId);

    case 'ENQUEUE_PARTICLE':
      return enqueueParticle(state, action.nodeId, action.particleId);

    case 'DEQUEUE_PARTICLE':
      return dequeueParticle(state, action.nodeId, action.particleId);

    case 'PLAY_NODE':
      return playNode(state, action.nodeId);

    case 'STOP_NODE':
      return stopNode(state, action.nodeId);

    default:
      return state;
  }
};
