import config from '../config/config';
import Particle from './Particle';
import uuidv1 from 'uuid/v1';
import names from '../config/names';

class Stream {
  constructor(position) {

    this.id = uuidv1();

    let x = position[0];
    let y = position[1];

    let particles = [];
    for (let i = 0; i < config.particle.count; i++) {
      particles.push(new Particle([x, y]));
    }

    let queue = [];
    for (let i = 0; i < config.stream.size; i++) {
      queue.push([x, y]);
    }

    this.queue = queue;
    this.easing = '';
    this.mouseState = 'up';
    this.headPosition = [x, y];
    this.pathIndex = 0;
    this.path = [];
    this.particles = particles;
    this.name = names.generate();
    this.selected = false;

    this.calculateEasing = this.calculateEasing.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  advancePathIndex() {

    this.pathIndex++;
    if (this.pathIndex > (this.path.length - 1)) {
      this.pathIndex = 0;
    }
  }

  calculateEasing(position, easing) {
    let dx = position[0] - easing[0];
    easing = [easing[0] + (dx * config.stream.easingFactor), easing[1]];

    let dy = position[1] - easing[1];
    easing = [easing[0], easing[1] + (dy * config.stream.easingFactor)];

    return easing;
  }

  onMouseDown(event) {
    event.preventDefault();
    let x = event.pageX;
    let y = event.pageY;

    this.headPosition = [x, y];
    this.path = [];
    this.pathIndex = 0;
    this.path.push(this.headPosition);
    this.mouseState = 'down';
  }

  onMouseUp(event) {
    event.preventDefault();
    this.mouseState = 'up';
  }

  onMouseMove(event) {
    event.preventDefault();
    let x = event.pageX;
    let y = event.pageY;
    this.headPosition = [x, y];
  }

  flow() {
    if (this.headPosition !== '') {
      if (this.mouseState === 'up') {
        if (this.path.length) {
          this.headPosition = this.path[this.pathIndex];
          this.advancePathIndex();
        }
      } else {
        this.path.push(this.headPosition);
        if (this.queue.length < config.stream.size) {
          this.queue.push(this.headPosition);
        }
      }
      if (this.easing === '') {
        this.easing = this.headPosition;
      }
      this.easing = this.calculateEasing(this.headPosition, this.easing, config.stream.easingFactor);
      this.queue[0] = this.easing;
      this.queue.push(this.queue.shift());

      if (this.particles.length) {

        let pointInRope = 0;
        let particleIdx = 0;
        let step = Math.floor(this.queue.length / (this.particles.length - 1));

        while (pointInRope <= this.queue.length - step) {
          this.particles[particleIdx].position = this.queue[pointInRope];
          if ((pointInRope + step * 2) > this.queue.length) {
            pointInRope = this.queue.length - 1;
          } else {
            pointInRope += (step - 1);
          }
          particleIdx++;
        }

        this.particles[this.particles.length - 1].position = this.queue[this.queue.length - 1];
      }
    }
  }

  render(canvasContext) {

    canvasContext.beginPath();
    canvasContext.strokeStyle = this.selected ? config.selectedStream.strokeStyle : config.stream.strokeStyle;
    canvasContext.lineWidth = config.stream.lineWidth;
    canvasContext.setLineDash(config.stream.lineDash);

    for (let i=1; i<this.queue.length; i++) {
      
      canvasContext.moveTo(this.queue[i-1][0], this.queue[i-1][1]);
      canvasContext.lineTo(this.queue[i][0], this.queue[i][1]);
    }

    canvasContext.stroke();

    this.particles.forEach((particle) => {
      particle.render(canvasContext);
    });
  }
}

module.exports = Stream;
