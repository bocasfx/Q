import config from '../config/config';
import Particle from './Particle';
import uuidv1 from 'uuid/v1';
import names from '../config/names';
import { getPosition, calculateDistance } from '../utils/utils';

class LinearStream {
  constructor(position) {

    this.id = uuidv1();
    this.name = names.generate();
    this.length = 0;
    this.disabled = false;
    this.particles = [];
    this.from = position;
    this.to = null;
    this.angles = [];
    this.speed = 5.0;
    this.distance = 0;
    this.particleOffset = 0;
    this.speed = 1;

    for (let i=0; i < config.particle.count; i++) {
      this.particles.push(new Particle([this.from[0], this.from[1]]));
    }
  }

  onMouseDown(event) {
    this.to = getPosition(event);
    this.distance = 0;
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
  }

  flow() {
    if (this.disabled) {
      return;
    }

    this.particles.forEach((particle, idx) => {

      let ratio = (this.particleOffset + idx * this.space) / this.distance;
      this.particleOffset += this.speed;

      if (this.particleOffset + idx * this.space >= this.distance) {
        this.particleOffset = 0;
      }

      let x3 = ratio * this.to[0] + (1 - ratio) * this.from[0];
      let y3 = ratio * this.to[1] + (1 - ratio) * this.from[1];
      particle.position = [x3, y3];
    });
  }

  render(canvasContext) {

    canvasContext.beginPath();
    canvasContext.strokeStyle = this.selected ? config.selectedCircularStream.strokeStyle : config.circularStream.strokeStyle;
    canvasContext.strokeStyle = this.disabled ? config.circularStream.strokeStyle : canvasContext.strokeStyle;
    canvasContext.lineWidth = config.circularStream.lineWidth;
    canvasContext.setLineDash(config.circularStream.lineDash);

    canvasContext.moveTo(this.from[0], this.from[1]);
    canvasContext.lineTo(this.to[0], this.to[1]);

    canvasContext.stroke();

    this.particles.forEach((particle) => {
      particle.disabled = this.disabled;
      particle.render(canvasContext);
    });
  }
}
  
module.exports = LinearStream;
