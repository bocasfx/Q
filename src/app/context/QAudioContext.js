import config from '../../config/config';
import Delay from '../../elements/FX/Delay';
import Filter from '../../elements/FX/Filter';
import WaveShaper from '../../elements/FX/WaveShaper';
import Reverb from '../../elements/FX/Reverb';

class QAudioContext {
  constructor() {
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();

    this.fxDestination = this.ctx.createGain();
    this.waveShaper = new WaveShaper(this.ctx, config.fx.waveShaper);
    this.filter = new Filter(this.ctx, config.fx.filter);
    this.delay = new Delay(this.ctx, config.fx.delay);
    this.reverb = new Reverb(this.ctx, config.fx.reverb);

    this.fxDestination.connect(this.waveShaper.input, 0, 0);
    this.waveShaper.connect(this.filter);
    this.filter.connect(this.delay.input);
    this.delay.connect(this.reverb.input);
    this.reverb.connect(this.ctx.destination);
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

  set reverbImpulseResponse(value) {
    this.reverb.impulseResponse = value;
  }

  get reverbImpulseResponse() {
    return this.reverb.impulseResponse;
  }

  triggerFilter() {
    this.filter.trigger();
  }
}

let audioCtx = new QAudioContext();
export default audioCtx;
