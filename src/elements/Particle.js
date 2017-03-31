import config from '../config/config';

class Particle {
  constructor(position) {
    this.position = position;
  }

  render(canvasContext) {

    canvasContext.beginPath();
    canvasContext.arc(this.position[0] + 3, this.position[1] + 3, config.particle.radius, 0, 2 * Math.PI, false);
    canvasContext.fillStyle = config.particle.shadow;
    canvasContext.fill();

    canvasContext.beginPath();
    canvasContext.arc(this.position[0], this.position[1], config.particle.radius, 0, 2 * Math.PI, false);
    canvasContext.strokeStyle = config.particle.strokeStyle;
    canvasContext.setLineDash(config.particle.lineDash);
    canvasContext.fillStyle = config.particle.fillStyle;
    canvasContext.fill();
    canvasContext.stroke();
  }
}

export default Particle;