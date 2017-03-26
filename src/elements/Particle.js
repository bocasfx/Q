import config from '../config/config';

class Particle {
  constructor(position) {
    this.position = position;
  }

  render(canvasContext, position) {
    this.position = position;

    canvasContext.beginPath();
    canvasContext.arc(position[0] + 3, position[1] + 3, config.particle.radius, 0, 2 * Math.PI, false);
    canvasContext.fillStyle = config.particle.shadow;
    canvasContext.fill();

    canvasContext.beginPath();
    canvasContext.arc(position[0], position[1], config.particle.radius, 0, 2 * Math.PI, false);
    canvasContext.strokeStyle = config.particle.strokeStyle;
    canvasContext.setLineDash(config.particle.lineDash);
    canvasContext.fillStyle = config.particle.fillStyle;
    canvasContext.fill();
    canvasContext.stroke();
  }
}

export default Particle;