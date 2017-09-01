import config from '../config';
import Delay from '../../elements/FX/Delay';
import Filter from '../../elements/FX/Filter';
import WaveShaper from '../../elements/FX/WaveShaper';
import Reverb from '../../elements/FX/Reverb';

class QAudioContext {
  constructor() {
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.delay = new Delay(this.ctx, config.fx.delay);
    this.waveShaper = new WaveShaper(this.ctx, config.fx.waveShaper);
    this.filter = new Filter(this.ctx, config.fx.filter);
    this.reverb = new Reverb(this.ctx, null);

    this.waveShaper.connect(this.delay);
    this.delay.connect(this.filter);
    this.filter.connect(this.reverb);
    this.filter.connect(this.ctx.destination);
    this.reverb.connect(this.ctx.destination);
  }

  get fxDestination() {
    return this.waveShaper;
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

  set waveShaperAmount(value) {
    this.waveShaper.amount = value;
  }

  set reverbAmount(value) {
    this.reverb.amount = value;
  }

  triggerFilter() {
    this.filter.trigger();
  }
}

let audioCtx = new QAudioContext();
export default audioCtx;
