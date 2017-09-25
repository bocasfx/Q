import config from '../../config/config';
import Particle from './Particle';
import { getPosition, calculateDistance } from '../../utils/utils';
import Stream from './Stream';

class CircularStream extends Stream {
  constructor({position, radius = 0, speed = 1.0, count = 1}) {
    super({position, speed, count});
    this.radius = radius;
    this.position = position;
    this.mousePosition = position;
    this.cx = this.position[0] + this.radius;
    this.cy = this.position[0] + this.radius;
    this.deg2rad = Math.PI / 180;
    this.variety = 'circular';
    this.count = count;
    this.speed = speed;
  }

  set count(value) {
    this.particles = [];
    this.angles = [];

    let space = 360 / value;
    let angle = 0;

    for(let i=0; i < value; i++) {
      this.angles.push(angle);
      angle += space;
    }

    for (let i=0; i < value; i++) {
      this.particles.push(new Particle([this.position[0] - this.radius, this.position[1] - this.radius]));
    }
  }

  get count() {
    return this.particles.length;
  }

  onMouseDown() {
    this.mouseDown = true;
  }

  onMouseMove(event) {
    this.mousePosition = getPosition(event);
    this.radius = calculateDistance (this.mousePosition, this.position);
  }

  onMouseUp() {
    this.mouseDown = false;
  }

  flow() {

    if (this.disabled) {
      return;
    }

    let angle = 0;

    this.particles.forEach((particle, idx) => {

      angle = this.angles[idx];
      
      let x = this.position[0] + this.radius * Math.cos(angle * this.deg2rad);
      let y = this.position[1] + this.radius * Math.sin(angle * this.deg2rad);

      particle.position = [x, y];
  
      this.angles[idx] = this.angles[idx] + this.speed;
      if (this.angles[idx] > 360) {
        this.angles[idx] = 0;
      }
    });
  }

  render(canvasContext) {

    canvasContext.beginPath();
    canvasContext.strokeStyle = this.selected ? config.selectedStream.strokeStyle : config.circularStream.strokeStyle;
    canvasContext.strokeStyle = this.disabled ? config.circularStream.strokeStyle : canvasContext.strokeStyle;
    canvasContext.lineWidth = config.circularStream.lineWidth;
    canvasContext.setLineDash(config.circularStream.lineDash);

    canvasContext.arc(this.position[0], this.position[1], this.radius, 0, 2 * Math.PI);

    if (this.mouseDown) {
      canvasContext.moveTo(this.position[0], this.position[1]);
      canvasContext.lineTo(this.mousePosition[0], this.mousePosition[1]);
    }

    canvasContext.stroke();

    this.particles.forEach((particle) => {
      particle.disabled = this.disabled;
      particle.render(canvasContext);
    });
  }
}
  
module.exports = CircularStream;
