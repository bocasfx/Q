

const initialState = {
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
  node: {
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
  stream: {
    easingFactor: 0.08,
    size: 100,
    strokeStyle: 'gray',
    lineWidth: 2,
    lineDash: [3, 30]
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
