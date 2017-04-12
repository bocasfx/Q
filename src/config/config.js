export default {
  app: {
    collisionDistance: 22,
    doubleClickDistance: 20,
    maxFrequency: 1500
  },
  canvas: {
    backgroundColor: 'rgba(0, 0, 0, 0.0)'
  },
  particle: {
    count: 1,
  },
  synthNode: {
    color: 'darkorange',
    envelope: {
      attack: 0.01,
      decay: 0.1,
      sustain: 1.0,
      release: 0.01
    }
  },
  midiNode: {
    color: 'limegreen',
    sustain: 100
  },
  audioNode: {
    color: 'deepskyblue',
    sustain: 100
  },
  stream: {
    color: 'deeppink',
    easingFactor: 0.08,
    size: 100,
    strokeStyle: 'gray',
    lineWidth: 2,
    lineDash: [3, 30]
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
    emptyMarks: {
      0: ' ',
      1: ' ',
      2: ' ',
      3: ' '
    }
  },
  controlPanel: {
    width: 300,
    adsr: {
      marks: {
        0.0: '-',
        0.1: ' ',
        0.2: '-',
        0.3: ' ',
        0.4: '-',
        0.5: ' ',
        0.6: '-',
        0.7: ' ',
        0.8: '-',
        0.9: ' ',
        1.0: ' '
      }
    }
  },
  menu: {
    width: 56
  }
};
