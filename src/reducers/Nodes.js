import MidiNode from '../elements/nodes/MidiNode';
import _ from 'lodash';
import initialState from '../config/initial-state';
import uuidv1 from 'uuid/v1';
import { getSelectedElements, getNodeById, graphHasLoop } from '../utils/utils';
import midiContext from '../app/context/MIDIContext';

const { nodes } = initialState;

const addMidiNode = (state, position, id) => {
  let midiNode = new MidiNode(position);
  midiNode.id = id || midiNode.id;
  let nodeList = state.splice(0);
  nodeList.push(midiNode);
  return nodeList;
};

const setNodeVolume = (state, id, volume) => {
  return state.map((node) => {
    if (node.id === id) {
      node.volume = volume;
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

const cloneNode = (state, id) => {
  state.forEach((node) => {
    if (node.id === id) {

      let clonedNode = null;
      clonedNode = new MidiNode();
      clonedNode.velocity = node.velocity;
      clonedNode.note = node.note;
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

const setNodeOctave = (state, id, value) => {
  return state.map((node) => {
    if (node.id === id) {
      node.octave = value;
    }
    return node;
  });
};

const setNodeChannel = (state, id, value) => {
  return state.map((node) => {
    if (node.id === id) {
      node.channel = value;
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
  let newMidiNode = new MidiNode(node.topLevel.position);
  newMidiNode = Object.assign(newMidiNode, node.topLevel);
  newMidiNode.id = node.topLevel.id;
  return newMidiNode;
};

const hydrateNodes = (state, payload) => {
  return payload.map((node) => {
    return createNode(node);
  });
};

const setNodeMidiOutput = (state, id, outputId) => {
  return state.map((node) => {
    if (node.id === id) {
      let midiOutput = _.find(midiContext.outputs, (output) => {
        return output.id === outputId;
      });
      node.midiOut = midiOutput;
    }
    return node;
  });
};

export default (state = nodes, action) => {
  switch (action.type) {

  case 'ADD_MIDI_NODE':
    return addMidiNode(state, action.position, action.id);

  case 'SET_NODE_VOLUME':
    return setNodeVolume(state, action.id, action.volume);

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

  case 'SET_NODE_OCTAVE':
    return setNodeOctave(state, action.id, action.value);

  case 'SET_NODE_CHANNEL':
    return setNodeChannel(state, action.id, action.value);

  case 'UPDATE_SELECTED_NODE_POSITION_BY_DELTA':
    return updateSelectedNodePositionByDelta(state, action.dx, action.dy);

  case 'UPDATE_NODE_POSITION_BY_DELTA':
    return updateNodePositionByDelta(state, action.dx, action.dy);

  case 'HYDRATE_NODES':
    return hydrateNodes(state, action.payload);

  case 'SET_NODE_MIDI_OUTPUT':
    return setNodeMidiOutput(state, action.id, action.outputId);

  default:
    return state;
  }
};
