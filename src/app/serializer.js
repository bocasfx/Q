
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
  return (({ id, type, name, position, selected, note, velocity, disabled, links, lag, probability }) => {
    return {
      topLevel: { id, type, name, position, selected, note, velocity, disabled, links, lag, probability },
      inner: {}
    };
  })(node);
};

const serializeAudioNode = (node) => {
  return (({ id, type, name, position, selected, disabled, links, lag, path, volume, attack, release, probability, sendFXGain }) => {
    return {
      topLevel: { id, type, name, position, selected, disabled, links, lag, path, volume, attack, release, probability, sendFXGain },
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
