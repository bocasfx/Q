import config from '../config';
import Delay from '../../elements/FX/Delay';
import Filter from '../../elements/FX/Filter';

class QAudioContext {
  constructor() {
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.delay = new Delay(this.ctx, config.fx.delay);
    this.filter = new Filter(this.ctx, config.fx.filter);

    this.delay.connect(this.filter);
    this.filter.connect(this.ctx.destination);
  }

  get fxDestination() {
    return this.delay;
  }

  get destination() {
    return this.filter;
  }

  set time(value) {
    this.delay.time = value;
  }

  set feedback(value) {
    this.delay.feedback = value;
  }

  set cutoffFrequency(value) {
    this.delay.cutoffFrequency = value;
  }

  set filterCutoffFrequency(value) {
    this.filter.frequency = value;
  }

  set filterQ(value) {
    this.filter.q = value;
  }

  set filterAttack(value) {
    this.filter.attack = value;
  }

  set filterRelease(value) {
    this.filter.release = value;
  }

  triggerFilter() {
    this.filter.trigger();
  }
}

let audioCtx = new QAudioContext();
export default audioCtx;
