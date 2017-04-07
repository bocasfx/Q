export default {
  app: {
    collisionDistance: 22,
    doubleClickDistance: 15,
    maxFrequency: 1500
  },
  canvas: {
    backgroundColor: 'rgba(0, 0, 0, 0.0)'
  },
  particle: {
    radius: 7,
    fillStyle: 'teal',
    strokeStyle: 'lightseagreen',
    lineJoin: 'round',
    lineWidth: 2,
    lineDash: [],
    count: 1,
    shadow: 'rgba(0, 0, 0, 0.3)'
  },
  inactiveNode: {
    fillStyle: 'rgba(211, 211, 211, 0.7)', 
    strokeStyle: 'rgba(169, 169, 169, 0.7)'
  },
  synthNode: {
    radius: 15,
    fillStyle: 'rgba(102, 51, 153, 0.7)', 
    lineDash: [],
    lineWidth: 2,
    strokeStyle: 'rgba(186, 85, 211, 0.7)',
    sustain: 500,
    shadow: 'rgba(0, 0, 0, 0.3)'
  },
  midiNode: {
    radius: 15,
    strokeStyle: 'rgba(124, 252, 0, 0.7)', 
    lineDash: [],
    lineWidth: 2,
    fillStyle: 'rgba(154, 205, 50, 0.7)',
    sustain: 500,
    shadow: 'rgba(0, 0, 0, 0.3)'
  },
  audioNode: {
    radius: 15,
    fillStyle: 'rgba(255, 255, 0, 0.7)', 
    lineDash: [],
    lineWidth: 2,
    strokeStyle: 'rgba(255, 215, 0, 0.7)',
    sustain: 500,
    shadow: 'rgba(0, 0, 0, 0.3)'
  },
  stream: {
    easingFactor: 0.08,
    size: 100,
    strokeStyle: 'gray',
    lineWidth: 2,
    lineDash: [3, 30]
  },
  selectedNode: {
    radius: 21,
    strokeStyle: 'rgb(255, 215, 0)',
    lineWidth: 2,
    lineDash: [3, 7]
  },

  selectedStream: {
    strokeStyle: 'rgb(255, 215, 0)',
  },
  fader: {
    marks: {
      0: '-0',
      0.1: '-1',
      0.2: '-2',
      0.3: '-3',
      0.4: '-4',
      0.5: '-5',
      0.6: '-6',
      0.7: '-7',
      0.8: '-8',
      0.9: '-9',
      1: '-10'
    }
  },
  waveToggle: {
    marks: {
      0: 'Sin',
      1: 'Sq',
      2: 'Saw',
      3: 'Tri'
    },
    emptyMarks: {
      0: '',
      1: '',
      2: '',
      3: ''
    }
  },
  adsr: {
    marks: {
      0: '-',
      1: ' ',
      2: '-',
      3: ' ',
      4: '-',
      5: ' ',
      6: '-',
      7: ' ',
      8: '-',
      9: ' ',
      10: '-'
    }
  }
};
