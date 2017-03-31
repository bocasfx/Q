import SynthNode from '../elements/SynthNode';
import MidiNode from '../elements/MidiNode';
import AudioNode from '../elements/AudioNode';
import { calculateDistance } from '../utils/utils';
import config from '../config/config';

const initialState = [];

const addSynthNode = (state, position, audioContext) => {
  let node = new SynthNode(position, audioContext);
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

const detectCollisions = (state, streams) => {
  // console.log('detecting');
  if (!streams.length || !state.length) {
    return state;
  }
  return state.map((node) => {
    if (!node.active) {
      streams.forEach((stream) => {
        stream.particles.forEach((particle) => {
          let distance = calculateDistance(node.position, particle.position);
          if (distance <= config.app.collisionDistance) {
            setTimeout(() => { node.play(); }, 0);
          }
        });
      });
    }
    return node;
  });
};

const setNodePosition = (state, id, position) => {
  return state.map((node) => {
    if (node.id === id) {
      node.position = position;
    }
    return node;
  });
};

const setNodeFrequency = (state, id, frequency) => {
  return state.map((node) => {
    if (node.id === id) {
      node.frequency = frequency;
    }
    return node;
  });
};

export default (state = initialState, action) => {
  switch (action.type) {

    case 'ADD_SYNTH_NODE':
      return addSynthNode(state, action.position, action.audioContext);

    case 'ADD_MIDI_NODE':
      return addMidiNode(state, action.position, action.midiContext);

    case 'ADD_AUDIO_NODE':
      return addAudioNode(state, action.position, action.midiContext);

    case 'DETECT_COLLISIONS':
      return detectCollisions(state, action.streams);

    case 'SET_NODE_POSITION':
      return setNodePosition(state, action.id, action.position);

    case 'SET_NODE_FREQUENCY':
      return setNodeFrequency(state, action.id, action.frequency);

    default:
      return state;
  }
};
