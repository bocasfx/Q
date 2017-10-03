
class Serializer {

  serializeSynthNode (node) {
    return (({ id, type, name, position, selected, volume, attack, release, noiseGain, osc1Freq, osc2Freq, disabled, pan, links, parentIds, lag, probability, sendFXGain, oscillator1, oscillator2, osc1Gain, osc2Gain }) => {
      return { 
        topLevel: {id, type, name, position, selected, volume, attack, release, noiseGain, osc1Freq, osc2Freq, disabled, pan, links, parentIds, lag, probability, sendFXGain},
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

  serializeMidiNode (node) {
    return (({ id, type, name, position, selected, note, velocity, disabled, links, parentIds, lag, probability }) => {
      return {
        topLevel: { id, type, name, position, selected, note, velocity, disabled, links, parentIds, lag, probability },
        inner: {}
      };
    })(node);
  };

  serializeAudioNode (node) {
    return (({ id, type, name, position, selected, disabled, links, parentIds, lag, path, volume, attack, release, probability, sendFXGain }) => {
      return {
        topLevel: { id, type, name, position, selected, disabled, links, parentIds, lag, path, volume, attack, release, probability, sendFXGain },
        inner: {}
      };
    })(node);
  };

  serializeCircularStream (stream) {
    return(({id, type, variety, name, position, radius, selected, disabled, speed, count}) => {
      return {
        topLevel: {id, type, variety, name, position, radius, selected, disabled, speed, count},
        inner: {}
      };
    })(stream);
  };

  serializeLinearStream (stream) {
    return(({id, type, variety, name, position, from, to, selected, disabled, speed, count, distance, length, particleOffset}) => {
      return {
        topLevel: {id, type, variety, name, position, from, to, selected, disabled, speed, count, distance, length, particleOffset},
        inner: {}
      };
    })(stream);
  };

  serializeFreehandStream (stream) {
    return (({id, variety, count, position, queue, easing, pathIndex, path}) => {
      return {
        topLevel: {id, variety, count, position, queue, easing, pathIndex, path, creating: false},
        inner: {}
      };
    })(stream);
  };

  serialize (payload) {
    let nodes = payload.nodes;
    let streams = payload.streams;
    let fx = payload.fx;

    let serializedNodes = nodes.map((node) => {
      switch (node.type) {
        case 'synth':
          return this.serializeSynthNode(node);
        case 'midi':
          return this.serializeMidiNode(node);
        case 'audio':
          return this.serializeAudioNode(node);
        default:
          return null;
      }
    });

    let serializedStreams = streams.map((stream) => {
      switch (stream.variety) {
        case 'circular':
          return this.serializeCircularStream(stream);
        case 'linear':
          return this.serializeLinearStream(stream);
        case 'freehand':
          return this.serializeFreehandStream(stream);
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
}

export default new Serializer();
