import initialState from '../config/initial-state';
import SynthNode from '../elements/SynthNode';
import MidiNode from '../elements/MidiNode';
import AudioNode from '../elements/AudioNode';

const createNode = (node) => {
  switch (node.type) {
    case 'synth':
      return new SynthNode(node.position);
    case 'midi':
      return new MidiNode(node.position);
    case 'audio':
      return new AudioNode(node.position);
    default:
      return null;
  }
};

const serializeSynthNode = (node) => {
  return (({ id, type, name, position, selected, volume, attack, release, osc1Freq, osc2Freq, disabled, pan, links, delay }) => {
    return { id, type, name, position, selected, volume, attack, release, osc1Freq, osc2Freq, disabled, pan, links, delay };
  })(node);
};

const serializeMidiNode = (node) => {
  return (({ id, type, name, position, selected, note, velocity, disabled, links, delay }) => {
    return { id, type, name, position, selected, note, velocity, disabled, links, delay };
  })(node);
};

const serializeAudioNode = (node) => {
  return (({ id, type, name, position, selected, disabled, links, delay }) => {
    return { id, type, name, position, selected, disabled, links, delay };
  })(node);
};

export const serialize = (payload) => {
  let nodes = payload.nodes;
  let serializedNodes = nodes.map((node) => {
    switch (node.type) {
      case 'synth':
        return serializeSynthNode(node);
      case 'midi':
        return serializeMidiNode(node);
      case 'audio':
        return serializeAudioNode(node);
      default:
        return null;
    }
  });
  return JSON.stringify({
    nodes: serializedNodes
  });
};

export const hydrate = (payload) => {
  let nodes = payload.nodes.map((node) => {
    let newNode = createNode(node);
    let extendedNode = Object.assign(newNode, node);
    return extendedNode;
  });
  let newState = Object.assign({}, payload, {
    nodes: nodes,
    devices: initialState.devices,
    streams: initialState.streams,
    selection: initialState.selection,
    notifications: initialState.notifications
  });
  return newState;
};
