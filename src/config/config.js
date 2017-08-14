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
  synth: {
    color: 'darkorange',
    envelope: {
      attack: 0.01,
      release: 0.01
    }
  },
  fx: {
    delay: {
      time: 0.5,
      feedback: 0.0,
      cutoff: 500
    },
    filter: {
      q: 100,
      detune: 0,
      cutoff: 2000,
      attack: 0.5,
      release: 0.5
    }
  },
  midi: {
    color: 'limegreen'
  },
  audio: {
    color: 'deepskyblue'
  },
  stream: {
    color: 'deeppink',
    easingFactor: 0.08,
    size: 100,
    strokeStyle: 'gray',
    lineWidth: 2,
    lineDash: [3, 30]
  },
  circularStream: {
    strokeStyle: 'gray',
    lineWidth: 2,
    lineDash: [3, 3],
    font: '12px Arial',
    fillStyle: 'gold',
    textAlign: 'center'
  },
  linearStream: {
    strokeStyle: 'gray',
    lineWidth: 2,
    lineDash: [3, 3],
    font: '12px Arial',
    fillStyle: 'gold',
    textAlign: 'center'
  },
  selectedStream: {
    strokeStyle: 'gold',
  },
  link: {
    strokeStyle: 'gray',
    lineWidth: 3,
    lineDash: [3, 3]
  },
  unlink: {
    strokeStyle: 'crimson'
  },
  knob: {
    zeroColor: 'dimgray'
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
