import config from '../../config/config';
import { getPosition } from '../../utils/utils';
import Stream from './Stream';

class FreehandStream extends Stream {
  constructor({position, queue = [], easing = '', pathIndex = 0, path = [], count = 1}) {
    super({position, speed: 1, count});
    this._position = position;
    this.queue = queue;
    this.easing = easing;
    this.headPosition = position;
    this.pathIndex = pathIndex;
    this.path = path;
    this.variety ='freehand';

    for (let i = 0; i < config.stream.size; i++) {
      this.queue.push(position);
    }

    this.markerImage = new Image();
    this.markerImage.src = './icons/elements/stream-marker.png';
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

  set position(value) {
    let dx = value[0] - this._position[0];
    let dy = value[1] - this._position[1];
    this._position = [this._position[0] + dx, this._position[1] + dy];
    for (let i = 0; i < config.stream.size; i++) {
      let item = this.queue[i];
      this.queue[i] = [item[0] + dx, item[1] + dy];
    }

    for (let i = 0; i < this.path.length; i++) {
      let item = this.path[i];
      this.path[i] = [item[0] + dx, item[1] + dy];
    }
  }

  get position() {
    return this._position;
  }

  onMouseDown(event) {
    event.preventDefault();
    this.headPosition = getPosition(event);
    this.path = [];
    this.pathIndex = 0;
    this.path.push(this.headPosition);
    this.mouseDown = true;
    this.showMarker = true;
    this.markerPosition = getPosition(event);
  }

  onMouseUp(event) {
    event.preventDefault();
    this.mouseDown = false;
    this.showMarker = false;
  }

  onMouseMove(event) {
    event.preventDefault();
    this.headPosition = getPosition(event);
  }

  flow() {
    if (this.disabled) {
      return;
    }
    if (this.headPosition !== '') {
      if (!this.mouseDown) {
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
        let step = this.particles.length > 1 ? Math.floor(this.queue.length / (this.particles.length - 1)) : this.queue.length * this.speed;

        while (pointInRope <= this.queue.length - step) {
          this.particles[particleIdx].position = this.queue[pointInRope];
          if ((pointInRope + step * 2) > this.queue.length) {
            pointInRope = this.queue.length - 1;
          } else {
            pointInRope += step;
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
    canvasContext.strokeStyle = this.disabled ? config.stream.strokeStyle : canvasContext.strokeStyle;
    canvasContext.lineWidth = config.stream.lineWidth;
    canvasContext.setLineDash(config.stream.lineDash);

    for (let i=1; i<this.queue.length; i++) {
      
      canvasContext.moveTo(this.queue[i-1][0], this.queue[i-1][1]);
      canvasContext.lineTo(this.queue[i][0], this.queue[i][1]);
    }

    canvasContext.stroke();

    this.particles.forEach((particle) => {
      particle.disabled = this.disabled;
      particle.render(canvasContext);
    });

    if (this.showMarker) {
      canvasContext.drawImage(this.markerImage, this.markerPosition[0] - 7.5, this.markerPosition[1] - 7.5);
    }
  }
}

module.exports = FreehandStream;
