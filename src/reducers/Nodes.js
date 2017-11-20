import SynthNode from '../elements/nodes/SynthNode';
import MidiNode from '../elements/nodes/MidiNode';
import AudioNode from '../elements/nodes/AudioNode';
import _ from 'lodash';
import { nodes } from '../config/initial-state';
import uuidv1 from 'uuid/v1';
import { getSelectedElements, getNodeById, graphHasLoop } from '../utils/utils';

let fs = null;

if (window.require) {
  fs = window.require('fs');
}

const addSynthNode = (state, position, id) => {
  let node = new SynthNode(position);
  node.id = id || node.id;
  let nodeList = state.splice(0);
  nodeList.push(node);
  return nodeList;
};

const addMidiNode = (state, position, id) => {
  let midiNode = new MidiNode(position);
  midiNode.id = id || midiNode.id;
  let nodeList = state.splice(0);
  nodeList.push(midiNode);
  return nodeList;
};

const addAudioNode = (state, position, id) => {
  let audioNode = new AudioNode(position);
  audioNode.id = id || audioNode.id;
  let nodeList = state.splice(0);
  nodeList.push(audioNode);
  return nodeList;
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

const setNodeSource = (state, id, buffer, path) => {
  return state.map((node) => {
    if (node.id === id) {
      node.setAudioSrc(buffer, path);
    }
    return node;
  });
};

const deleteNode = (state, id) => {
  let nodeList = state.splice(0);
  nodeList.forEach((node) => {
    if (node.id === id) {
      node.disconnect();
    }
  });
  return _.remove(nodeList, (node) => {
    return node.id !== id;
  });
};

const deleteSelectedNodes = (state) => {
  let nodeList = state.splice(0);
  nodeList.forEach((node) => {
    if (node.selected) {
      node.disconnect();
    }
  });
  return _.remove(nodeList, (node) => {
    return !node.selected;
  });
};

const unlinkSelectedNodes = (state) => {
  return state.map((node) => {
    if (node.selected) {
      node.links = [];
      node.parentIds.forEach((parentNodeId) => {
        let parentNode = getNodeById(state, parentNodeId);
        if (parentNode) {
          parentNode.unlink(node.id);
        }
      });
    }
    return node;
  });
};

const deleteAllNodes = (state) => {
  let nodeList = state.splice(0);
  nodeList.forEach((node) => {
    node.disconnect();
  });
  return [];
};

const selectNode = (state, id) => {
  let selectionCount = getSelectedElements(state).length;
  return state.map((node) => {
    if (node.id === id) {
      node.selected = true;
      node.selectionIdx = ++selectionCount;
    }
    return node;
  });
};

const selectAllNodes = (state) => {
  return state.map((node) => {
    node.selected = true;
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
  state.forEach((node) => {
    if (node.id === id) {

      let clonedNode = null;
      if (node.type === 'synth') {
        clonedNode = new SynthNode();
        clonedNode.osc1Freq = node.osc1Freq;
        clonedNode.osc2Freq = node.osc2Freq;
        clonedNode.osc1Freq = node.osc1Freq;
        clonedNode.osc2Freq = node.osc2Freq;
        clonedNode.osc1WaveType = node.oscillator1.oscillator.type;
        clonedNode.osc2WaveType = node.oscillator2.oscillator.type;
        clonedNode.osc1Gain = node.osc1Gain;
        clonedNode.osc2Gain = node.osc2Gain;
        clonedNode.noiseGain = node.noiseGain;
      } else if (node.type === 'midi') {
        clonedNode = new MidiNode();
        clonedNode.velocity = node.velocity;
        clonedNode.note = node.note;
      } else {
        clonedNode = new AudioNode();
        clonedNode.decodedAudioData = node.decodedAudioData;
      }

      clonedNode.active = false;
      clonedNode.lag = node.lag;
      clonedNode.links = [];
      clonedNode.name = node.name;
      clonedNode.pan = node.pan;
      clonedNode.particleQueue = [];
      clonedNode.position = [node.position[0] + 25, node.position[1] - 25];
      clonedNode.probability = node.probability;
      clonedNode.selected = node.selected;
      clonedNode.volume = node.volume;
      clonedNode._disabled = node._disabled;
      clonedNode.attack = node.attack;
      clonedNode.disabled = node.disabled;
      clonedNode.release = node.release;
      clonedNode.sendFXGain = node.sendFXGain;
      clonedNode.name = node.name + ' (clone)';
      clonedNode.id = uuidv1();
      
      state.push(clonedNode);
    }
  });
  return state;
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
      node.links.forEach((link) => {
        setNodeDisabledStatus(state, link.id, status);
      });
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
  srcNode.link(destNode.id);
  destNode.parentIds.push(srcNode.id);
  if (graphHasLoop(state, destNode, srcNode.id, false)) {
    alert('LOOP!');
  }
  return state;
};

const unlinkNodes = (state, srcId, destId) => {
  let nodeList = state.splice(0);
  let srcNode = _.find(nodeList, (node) => {
    return node.id === srcId;
  });
  let destNode = _.find(nodeList, (node) => {
    return node.id === destId;
  });
  if (!srcNode || !destNode) {
    return nodeList;
  }
  let parentIdIdx = destNode.parentIds.indexOf(srcNode.id);
  destNode.parentIds.splice(parentIdIdx, 1);
  srcNode.unlink(destNode.id);
  return nodeList;
};

const unlinkNode = (state, id) => {
  let nodeList = state.splice(0);
  let srcNode = getNodeById(nodeList, id);
  srcNode.links = [];
  srcNode.parentIds.forEach((parentNodeId) => {
    let parentNode = getNodeById(nodeList, parentNodeId);
    if (parentNode) {
      parentNode.unlink(srcNode);
    }
  });
  return nodeList;
};


const enqueueParticle = (state, id, particleId) => {
  return state.map((node) => {
    if (node.id === id) {
      node.enqueueParticle(particleId);
    }
    return node;
  });
};

const dequeueParticle = (state, id, particleId) => {
  return state.map((node) => {
    if (node.id === id) {
      node.dequeueParticle(particleId);
    }
    return node;
  });
};

const dequeueParticles = (state) => {
  return state.map((node) => {
    node.dequeueParticles();
    return node;
  });
};

const playNode = (state, id) => {
  return state.map((node) => {
    if (node.id === id) {
      node.play();
    }
    return node;
  });
};

const stopNode = (state, id) => {
  return state.map((node) => {
    if (node.id === id) {
      node.stop();
    }
    return node;
  });
};

const stopNodes = (state) => {
  return state.map((node) => {
    node.stop();
    return node;
  });
};

const stopSelectedNodes = (state) => {
  return state.map((node) => {
    if (node.selected) {
      node.stop();
    }
    return node;
  });
};

const setNodeLag = (state, id, lag) => {
  return state.map((node) => {
    if (node.id === id) {
      node.lag = lag;
    }
    return node;
  });
};

const setNodeProbability = (state, id, probability) => {
  return state.map((node) => {
    if (node.id === id) {
      node.probability = probability;
    }
    return node;
  });
};

const setNodeSendGain = (state, id, value) => {
  return state.map((node) => {
    if (node.id === id) {
      node.sendFXGain = value;
    }
    return node;
  });
};

const setNodeNoiseGain = (state, id, value) => {
  return state.map((node) => {
    if (node.id === id) {
      node.noiseGain = value;
    }
    return node;
  });
};

const setNodeOsc1Gain = (state, id, value) => {
  return state.map((node) => {
    if (node.id === id) {
      node.osc1Gain = value;
    }
    return node;
  });
};

const setNodeOsc2Gain = (state, id, value) => {
  return state.map((node) => {
    if (node.id === id) {
      node.osc2Gain = value;
    }
    return node;
  });
};

const setNodeVelocity = (state, id, value) => {
  return state.map((node) => {
    if (node.id === id) {
      node.velocity = value;
    }
    return node;
  });
};

const setNodeNote = (state, id, value) => {
  return state.map((node) => {
    if (node.id === id) {
      node.note = value;
    }
    return node;
  });
};


const updateSelectedNodePositionByDelta = (state, dx, dy) => {
  return state.map((node) => {
    if (node.selected) {
      node.position = [node.position[0] + dx, node.position[1] + dy];
    }
    return node;
  });
};

const updateNodePositionByDelta = (state, dx, dy) => {
  return state.map((node) => {
    node.position = [node.position[0] + dx, node.position[1] + dy];
    return node;
  });
};

const createNode = (node) => {
  switch (node.topLevel.type) {
    case 'synth':
      let newSynthNode = new SynthNode(node.topLevel.position);
      newSynthNode = Object.assign(newSynthNode, node.topLevel);
      newSynthNode.osc1WaveType = node.inner.oscillator1.waveType;
      newSynthNode.osc2WaveType = node.inner.oscillator2.waveType;
      newSynthNode.osc1Gain = node.inner.oscillator1.gain;
      newSynthNode.osc2Gain = node.inner.oscillator2.gain;
      newSynthNode.id = node.topLevel.id;
      return newSynthNode;
    case 'midi':
      let newMidiNode = new MidiNode(node.topLevel.position);
      newMidiNode = Object.assign(newMidiNode, node.topLevel);
      newMidiNode.id = node.topLevel.id;
      return newMidiNode;
    case 'audio':
      let newAudioNode = new AudioNode(node.topLevel.position);
      newAudioNode = Object.assign(newAudioNode, node.topLevel);
      newAudioNode.id = node.topLevel.id;
      if (node.topLevel.path) {
        fs.readFile(node.topLevel.path, (err, dataBuffer) => {
          if (err) {
            alert(err);
            return;
          }
          newAudioNode.setAudioSrc(dataBuffer, node.topLevel.path);

          let name = node.topLevel.path.split('/');
          name = name[name.length -1];
          newAudioNode.name = name;
        });
      }
      return newAudioNode;
    default:
      return null;
  }
};

const hydrateNodes = (state, payload) => {
  return payload.map((node) => {
    return createNode(node);
  });
};

export default (state = nodes, action) => {
  switch (action.type) {

    case 'ADD_SYNTH_NODE':
      return addSynthNode(state, action.position, action.id);

    case 'ADD_MIDI_NODE':
      return addMidiNode(state, action.position, action.id);

    case 'ADD_AUDIO_NODE':
      return addAudioNode(state, action.position, action.id);

    case 'SET_NODE_OSC1_FREQUENCY':
      return setNodeOsc1Frequency(state, action.id, action.frequency);

    case 'SET_NODE_OSC2_FREQUENCY':
      return setNodeOsc2Frequency(state, action.id, action.frequency);

    case 'SET_NODE_VOLUME':
      return setNodeVolume(state, action.id, action.volume);

    case 'SET_NODE_SOURCE':
      return setNodeSource(state, action.id, action.buffer, action.path);

    case 'DELETE_NODE':
      return deleteNode(state, action.id);

    case 'DELETE_ALL_NODES':
      return deleteAllNodes(state);

    case 'DELETE_SELECTED_NODES':
      return deleteSelectedNodes(state);

    case 'UNLINK_SELECTED_NODES':
      return unlinkSelectedNodes(state);

    case 'SELECT_NODE':
      return selectNode(state, action.id);

    case 'DESELECT_NODES':
      return deselectNodes(state);

    case 'SELECT_ALL_NODES':
      return selectAllNodes(state);

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

    case 'UNLINK_NODES':
      return unlinkNodes(state, action.srcId, action.destId);

    case 'UNLINK_NODE':
      return unlinkNode(state, action.id);

    case 'ENQUEUE_PARTICLE':
      return enqueueParticle(state, action.id, action.particleId);

    case 'DEQUEUE_PARTICLE':
      return dequeueParticle(state, action.id, action.particleId);

    case 'DEQUEUE_PARTICLES':
      return dequeueParticles(state);

    case 'PLAY_NODE':
      return playNode(state, action.id);

    case 'STOP_NODE':
      return stopNode(state, action.id);

    case 'STOP_NODES':
      return stopNodes(state);

    case 'STOP_SELECTED_NODES':
      return stopSelectedNodes(state);

    case 'SET_NODE_LAG':
      return setNodeLag(state, action.id, action.lag);

    case 'SET_NODE_PROBABILITY':
      return setNodeProbability(state, action.id, action.probability);

    case 'SET_NODE_SEND_GAIN':
      return setNodeSendGain(state, action.id, action.value);

    case 'SET_NODE_NOISE_GAIN':
      return setNodeNoiseGain(state, action.id, action.value);

    case 'SET_NODE_OSC1_GAIN':
      return setNodeOsc1Gain(state, action.id, action.value);

    case 'SET_NODE_OSC2_GAIN':
      return setNodeOsc2Gain(state, action.id, action.value);

    case 'SET_NODE_VELOCITY':
      return setNodeVelocity(state, action.id, action.value);

    case 'SET_NODE_NOTE':
      return setNodeNote(state, action.id, action.value);

    case 'UPDATE_SELECTED_NODE_POSITION_BY_DELTA':
      return updateSelectedNodePositionByDelta(state, action.dx, action.dy);

    case 'UPDATE_NODE_POSITION_BY_DELTA':
      return updateNodePositionByDelta(state, action.dx, action.dy);

    case 'HYDRATE_NODES':
      return hydrateNodes(state, action.payload);

    default:
      return state;
  }
};
