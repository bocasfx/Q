module.exports = {
  app: {
    hydrating: false,
    width: window.innerWidth,
    height: window.innerHeight,
    dirty: false
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
  fx: {
    delay: {
      time: 0.5,
      feedback: 0.0,
      disabled: true
    },
    filter: {
      q: 0,
      cutoffFrequency: 2000,
      attack: 0,
      disabled: true
    },
    waveShaper: {
      amount: 0,
      oversample: '4x',
      disabled: true
    },
    reverb: {
      amount: 0,
      impulseResponse: 'audio/ir/hamilton-mausoleum.wav',
      disabled: true
    }
  },
  transport: {
    playing: false,
    fpsCount: 0
  },
  midi: {
    destinations: []
  }
};
