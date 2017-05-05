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
  }
};
