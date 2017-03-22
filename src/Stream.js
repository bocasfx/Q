import config from './config';
import Particle from './Particle';

class Stream {
  constructor(x, y) {

    let particles = [];
    for (let i = 0; i < config.particle.count; i++) {
      particles.push(new Particle([0, 0]));
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

    this.calculateEasing = this.calculateEasing.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  initContext(context) {
    context.strokeStyle = 'lightseagreen';
    context.lineJoin = 'round';
    context.lineWidth = 2;
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
    var x = event.pageX;
    var y = event.pageY;

    this.headPosition = [x, y];
    this.path = [];
    this.pathIndex = 0;
    this.path.push(this.headPosition);
    this.mouseState = 'down';
  }

  onMouseUp() {
    event.preventDefault();
    this.mouseState = 'up';
  }

  onMouseMove(event) {
    event.preventDefault();
    var x = event.pageX;
    var y = event.pageY;
    this.headPosition = [x, y];
  }

  render(context) {
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

      this.initContext(context);

      let i = 1;
      let j = 0;

      while (i < this.queue.length) {
        this.particles[j].render(context, this.queue[i]);
        i += (config.stream.size / config.particle.count);
        j += 1;
      }
    }

    // Render stream
    // for (let i=1; i<this.queue.length; i++) {
    //   context.beginPath();
    //   context.moveTo(this.queue[i-1][0], this.queue[i-1][1]);
    //   context.lineTo(this.queue[i][0], this.queue[i][1]);
    //   context.closePath();
    //   context.stroke();
    // }
  }
}

module.exports = Stream;
