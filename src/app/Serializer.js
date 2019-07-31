class Serializer {
  serializeMidiNode(node) {
    return (({
      id,
      type,
      name,
      position,
      selected,
      note,
      velocity,
      octave,
      channel,
      disabled,
      links,
      parentIds,
      lag,
      probability,
    }) => {
      return {
        topLevel: {
          id,
          type,
          name,
          position,
          selected,
          note,
          velocity,
          octave,
          channel,
          disabled,
          links,
          parentIds,
          lag,
          probability,
        },
        inner: {},
      };
    })(node);
  }

  serializeCircularStream(stream) {
    return (({ id, type, variety, name, position, radius, selected, disabled, speed, count }) => {
      return {
        topLevel: { id, type, variety, name, position, radius, selected, disabled, speed, count },
        inner: {},
      };
    })(stream);
  }

  serializeLinearStream(stream) {
    return (({
      id,
      type,
      variety,
      name,
      position,
      from,
      to,
      selected,
      disabled,
      speed,
      count,
      distance,
      length,
      particleOffset,
    }) => {
      return {
        topLevel: {
          id,
          type,
          variety,
          name,
          position,
          from,
          to,
          selected,
          disabled,
          speed,
          count,
          distance,
          length,
          particleOffset,
        },
        inner: {},
      };
    })(stream);
  }

  serializeFreehandStream(stream) {
    return (({ id, variety, count, position, queue, easing, pathIndex, path }) => {
      return {
        topLevel: { id, variety, count, position, queue, easing, pathIndex, path, creating: false },
        inner: {},
      };
    })(stream);
  }

  serialize(payload) {
    let nodes = payload.nodes;
    let streams = payload.streams;

    let serializedNodes = nodes.map(node => {
      return this.serializeMidiNode(node);
    });

    let serializedStreams = streams.map(stream => {
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
    });
  }
}

export default new Serializer();
