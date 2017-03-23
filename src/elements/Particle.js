import config from '../config/config';

class Particle {
  render(context, position) {
    context.beginPath();
    context.arc(position[0], position[1], config.particle.radius, 0, 2 * Math.PI, false);
    context.strokeStyle = config.particle.strokeStyle;
    context.setLineDash(config.particle.lineDash);
    context.fillStyle = config.particle.fillStyle;
    context.fill();
    context.stroke();
  }
}

export default Particle;