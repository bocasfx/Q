import config from '../../config/config';
import { getPosition, calculateDistance } from '../../utils/utils';
import Stream from './Stream';

class LinearStream extends Stream {
  constructor({position, to = null, distance = 0, particleOffset = 0, length = 0, count = 1, speed = 1.0}) {
    super({position, speed, count});
    this.length = length;
    this.from = position;
    this.to = to;
    this.angles = [];
    this.distance = distance;
    this.particleOffset = particleOffset;
    this.variety = 'linear';
    this.count = count;
    this.speed = speed;
  }

  onMouseDown(event) {
    this.to = getPosition(event);
    this.distance = 0;
    this.mouseDown = true;
  }

  onMouseMove(event) {
    this.to = getPosition(event);
    this.distance = calculateDistance(this.from, this.to);
    this.space = this.distance / this.particles.length;
  }

  onMouseUp(event) {
    this.to = getPosition(event);
    this.distance = calculateDistance(this.from, this.to);
    this.space = this.distance / this.particles.length;
    this.mouseDown = false;
  }

  set position(value) {
    let dx = value[0] - this.from[0];
    let dy = value[1] - this.from[1];
    this.from = [this.from[0] + dx, this.from[1] + dy];
    this.to = [this.to[0] + dx, this.to[1] + dy];
  }

  get position() {
    return this.from;
  }

  flow() {
    if (this.disabled) {
      return;
    }

    this.particles.forEach((particle, idx) => {
      if (this.distance === 0) {
        particle.position = this.from;
        return;
      }

      let ratio = (this.particleOffset + idx * this.space) / this.distance;
      this.particleOffset += this.speed;

      if (this.particleOffset + idx * this.space >= this.distance) {
        this.particleOffset = 0;
      }

      let x = ratio * this.to[0] + (1 - ratio) * this.from[0];
      let y = ratio * this.to[1] + (1 - ratio) * this.from[1];
      particle.position = [x, y];
    });
  }

  render(canvasContext) {

    canvasContext.save();
    canvasContext.beginPath();
    canvasContext.strokeStyle = this.selected ? config.selectedStream.strokeStyle : config.linearStream.strokeStyle;
    canvasContext.strokeStyle = this.disabled ? config.linearStream.strokeStyle : canvasContext.strokeStyle;
    canvasContext.lineWidth = config.linearStream.lineWidth;
    canvasContext.setLineDash(config.linearStream.lineDash);

    canvasContext.moveTo(this.from[0], this.from[1]);
    canvasContext.lineTo(this.to[0], this.to[1]);

    canvasContext.stroke();
    canvasContext.restore();

    this.particles.forEach((particle) => {
      particle.disabled = this.disabled;
      particle.render(canvasContext);
    });
  }
}
  
export default LinearStream;
