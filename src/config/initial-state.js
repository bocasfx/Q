let initialState = {
  app: {
    hydrating: false,
    width: window.innerWidth,
    height: window.innerHeight,
    dirty: false,
    visualizer: 'visualizerOff'
  },
  devices: {
    streams: false,
    circularStreams: false,
    linearStreams: false,
    synthNodes: false,
    midiNodes: false,
    audioNodes: false,
    settings: false,
    nodeSettings: false,
    nodeSettingsId: null,
    mixer: false,
    link: false,
    unlink: false,
    grab: true,
    clone: false
  },
  nodes: [],
  streams: [],
  selection: {
    objType: 'nodes'
  },
  transport: {
    playing: false,
    fpsCount: 0
  },
  midi: {
    destinations: []
  }
};

module.exports = initialState;