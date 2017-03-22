import config from './config';

class Particle {
  constructor(position) {
    this.position = position;
  }

  setPosition(position) {
    this.position = position;
  }

  render(context, position) {
    context.beginPath();
    context.arc(position[0], position[1], config.particle.radius, 0, 2 * Math.PI, false);
    context.fillStyle = config.particle.color;
    context.fill();
    context.stroke();
  }
}

export default Particle;