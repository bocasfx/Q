import initialState from '../config/initial-state';
import SynthNode from '../elements/SynthNode/SynthNode';
import MidiNode from '../elements/MidiNode';
import AudioNode from '../elements/AudioNode';
import CircularStream from '../elements/CircularStream';
import LinearStream from '../elements/LinearStream';
import FreehandStream from '../elements/FreehandStream';

const createNode = (node) => {
  switch (node.topLevel.type) {
    case 'synth':
      let newSynthNode = new SynthNode(node.topLevel.position);
      newSynthNode = Object.assign(newSynthNode, node.topLevel);
      newSynthNode.osc1WaveType = node.inner.oscillator1.waveType;
      newSynthNode.osc2WaveType = node.inner.oscillator2.waveType;
      newSynthNode.osc1Gain = node.inner.oscillator1.gain;
      newSynthNode.osc2Gain = node.inner.oscillator2.gain;
      return newSynthNode;
    case 'midi':
      return new MidiNode(node.topLevel.position);
    case 'audio':
      return new AudioNode(node.topLevel.position);
    default:
      return null;
  }
};

const createStream = (stream) => {
  switch (stream.topLevel.variety) {
    case 'circular':
      return new CircularStream(stream.topLevel);
    case 'linear':
      return new LinearStream(stream.topLevel);
    case 'freehand':
      return new FreehandStream(stream.topLevel);
    default:
      return null;
  }
};

const serializeSynthNode = (node) => {
  return (({ id, type, name, position, selected, volume, attack, release, noiseGain, osc1Freq, osc2Freq, disabled, pan, links, lag, probability, sendFXGain, oscillator1, oscillator2, osc1Gain, osc2Gain }) => {
    return { 
      topLevel: {id, type, name, position, selected, volume, attack, release, noiseGain, osc1Freq, osc2Freq, disabled, pan, links, lag, probability, sendFXGain},
      inner: {
        oscillator1: {
          waveType: oscillator1.waveType,
          gain: osc1Gain
        },
        oscillator2: {
          waveType: oscillator2.waveType,
          gain: osc2Gain
        }
      }
    };
  })(node);
};

const serializeMidiNode = (node) => {
  return (({ id, type, name, position, selected, note, velocity, disabled, links, lag }) => {
    return {
      topLevel: { id, type, name, position, selected, note, velocity, disabled, links, lag },
      inner: {}
    };
  })(node);
};

const serializeAudioNode = (node) => {
  return (({ id, type, name, position, selected, disabled, links, lag }) => {
    return {
      topLevel: { id, type, name, position, selected, disabled, links, lag },
      inner: {}
    };
  })(node);
};

const serializeCircularStream = (stream) => {
  return(({id, type, variety, name, position, radius, selected, disabled, speed, count}) => {
    return {
      topLevel: {id, type, variety, name, position, radius, selected, disabled, speed, count},
      inner: {}
    };
  })(stream);
};

const serializeLinearStream = (stream) => {
  return(({id, type, variety, name, position, from, to, selected, disabled, speed, count, distance, length, particleOffset}) => {
    return {
      topLevel: {id, type, variety, name, position, from, to, selected, disabled, speed, count, distance, length, particleOffset},
      inner: {}
    };
  })(stream);
};

const serializeFreehandStream = (stream) => {
  return (({id, variety, count, position, queue, easing, pathIndex, path}) => {
    return {
      topLevel: {id, variety, count, position, queue, easing, pathIndex, path},
      inner: {}
    };
  })(stream);
};

export const serialize = (payload) => {
  let nodes = payload.nodes;
  let streams = payload.streams;
  let fx = payload.fx;

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

  let serializedStreams = streams.map((stream) => {
    switch (stream.variety) {
      case 'circular':
        return serializeCircularStream(stream);
      case 'linear':
        return serializeLinearStream(stream);
      case 'freehand':
        return serializeFreehandStream(stream);
      default:
        return null;
    }
  });

  return JSON.stringify({
    nodes: serializedNodes,
    streams: serializedStreams,
    fx
  });
};

export const hydrate = (payload) => {
  let nodes = payload.nodes.map((node) => {
    return createNode(node);
  });

  let streams = payload.streams.map((stream) => {
    return createStream(stream);
  });

  let newState = Object.assign({}, payload, {
    nodes: nodes,
    devices: initialState.devices,
    streams: streams,
    selection: initialState.selection,
    notifications: initialState.notifications,
    fx: payload.fx
  });
  return newState;
};
