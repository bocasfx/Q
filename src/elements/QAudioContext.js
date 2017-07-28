import config from '../config/config';
import Delay from './Delay';

class QAudioContext {
  constructor() {
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.delay = new Delay(this.ctx, config.fx.delay);

    this.delay.connect(this.ctx.destination);
  }

  get delayDestination() {
    return this.delay;
  }

  get destination() {
    return this.ctx.destination;
  }

  set time(value) {
    this.delay.time = value;
  }

  set feedback(value) {
    this.delay.feedback = value;
  }

  set cutoff(value) {
    this.delay.cutoff = value;
  }
}

let audioCtx = new QAudioContext();
export default audioCtx;
