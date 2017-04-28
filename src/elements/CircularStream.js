import config from '../config/config';
import Particle from './Particle';
import uuidv1 from 'uuid/v1';
import names from '../config/names';
import { getPosition, calculateDistance } from '../utils/utils';

class Stream {
  constructor(position) {

    this.id = uuidv1();
    this.name = names.generate();
    this.radius = 0;
    this.disabled = false;
    this.particles = [];
    this.position = position;
    this.cx = this.position[0] + this.radius;
    this.cy = this.position[0] + this.radius;
    this.deg2rad = Math.PI / 180;
    this.particles = [];
    this.angles = [];
    this.speed = 1.0;

    let spc = 360 / config.particle.count;
    let angle = 0;

    for(let i=0; i < config.particle.count; i++) {
      this.angles.push(angle);
      angle += spc;
    }

    for (let i=0; i < config.particle.count; i++) {
      this.particles.push(new Particle([this.position[0] - this.radius, this.position[1] - this.radius]));
    }
  }

  onMouseDown() {

  }

  onMouseMove(event) {
    let position = getPosition(event);
    this.radius = calculateDistance (position, this.position);
  }

  flow() {

    if (this.disabled) {
      return;
    }

    let angle = 0;

    this.particles.forEach((particle, idx) => {

      angle = this.angles[idx];
      
      let x = this.position[0] + this.radius * Math.cos(angle * this.deg2rad * this.speed);
      let y = this.position[1] + this.radius * Math.sin(angle * this.deg2rad * this.speed);


      particle.position = [x, y];
  
      this.angles[idx] = this.angles[idx] + 1;
      if (this.angles[idx] > 360) {
        this.angles[idx] = 0;
      }
    });
  }

  render(canvasContext) {

    canvasContext.beginPath();
    canvasContext.strokeStyle = this.selected ? config.selectedCircularStream.strokeStyle : config.circularStream.strokeStyle;
    canvasContext.strokeStyle = this.disabled ? config.circularStream.strokeStyle : canvasContext.strokeStyle;
    canvasContext.lineWidth = config.circularStream.lineWidth;
    canvasContext.setLineDash(config.circularStream.lineDash);

    canvasContext.arc(this.position[0], this.position[1], this.radius, 0, 2 * Math.PI);

    canvasContext.stroke();

    this.particles.forEach((particle) => {
      particle.disabled = this.disabled;
      particle.render(canvasContext);
    });
  }
}
  
module.exports = Stream;
