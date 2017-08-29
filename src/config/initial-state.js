module.exports = {
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
  notifications: {
    message: '',
    level: 'info',
    hidden: true
  },
  fx: {
    delay: {
      time: 0.5,
      feedback: 0.0,
      cutoffFrequency: 500
    },
    filter: {
      q: 0,
      cutoffFrequency: 2000,
      attack: 0
    },
    waveShaper: {
      amount: 0,
      oversample: '4x'
    }
  },
  transport: {
    playing: false
  },
  midi: {
    destinations: []
  }
};
