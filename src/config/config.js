export default {
  app: {
    collisionDistance: 22
  },
  canvas: {
    backgroundColor: 'rgba(0, 0, 0, 0.0)'
  },
  particle: {
    radius: 7,
    strokeStyle: 'teal',
    fillStyle: 'lightseagreen',
    lineJoin: 'round',
    lineWidth: 2,
    lineDash: [],
    count: 1
  },
  node: {
    radius: 15,
    strokeStyle: 'rgba(102, 51, 153, 0.7)', 
    lineDash: [],
    lineWidth: 3,
    fillStyle: 'rgba(186, 85, 211, 0.7)',
    sustain: 50
  },
  stream: {
    easingFactor: 0.08,
    size: 100,
    strokeStyle: 'darkgray',
    lineWidth: 2,
    lineDash: [3, 30]
  }
};
