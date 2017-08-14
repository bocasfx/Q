import config from '../../config/config';
import Node from '../Node';
import Oscillator from './Oscillator';
import Amplifier from './Amplifier';
import AmpEnvelopeGenerator from './AmpEnvelopeGenerator';
import qAudioContext from '../QAudioContext';
import NoiseGenerator from './NoiseGenerator';

class SynthNode extends Node {

  constructor(position) {
    super(position);

    this.oscillator1 = new Oscillator();
    this.oscillator2 = new Oscillator();
    this.amplifier = new Amplifier();
    this._sendFXGain = qAudioContext.ctx.createGain();
    this.noiseGenerator = new NoiseGenerator();
    this.ampEnvelopeGenerator = new AmpEnvelopeGenerator(config.synth.envelope);

    this._noiseGain = qAudioContext.ctx.createGain();
    this._noiseGain.gain.value = 0.0;

    this._osc1Gain = qAudioContext.ctx.createGain();
    this._osc1Gain.gain.value = 1.0;

    this._osc2Gain = qAudioContext.ctx.createGain();
    this._osc2Gain.gain.value = 1.0;

    this.oscillator1.connect(this._osc1Gain);
    this._osc1Gain.connect(this.amplifier.input);

    this.oscillator2.connect(this._osc2Gain);
    this._osc2Gain.connect(this.amplifier.input);

    this.noiseGenerator.connect(this._noiseGain);
    this._noiseGain.connect(this.amplifier.input);

    this.ampEnvelopeGenerator.connect(this.amplifier.amplitudeL, this.amplifier.amplitudeR);
    this.amplifier.connect(qAudioContext.destination);
    this.amplifier.connect(this._sendFXGain);
    this._sendFXGain.connect(qAudioContext.fxDestination.filter);
    this._sendFXGain.volume = 0;

    this.type = 'synth';

    this.nodeImg = new Image();
    this.nodeImg.src = './icons/elements/synth-node.png';

    this.activeNodeImg = new Image();
    this.activeNodeImg.src = './icons/elements/synth-node-active.png';

    this.probabilityNodeImg = new Image();
    this.probabilityNodeImg.src = './icons/elements/synth-node-probability.png';

  }

  set osc1Freq(freq) {
    this.oscillator1.frequency = freq;
  }

  get osc1Freq() {
    return this.oscillator1.frequency;
  }

  set osc2Freq(freq) {
    this.oscillator2.frequency = freq;
  }

  get osc2Freq() {
    return this.oscillator2.frequency;
  }

  set osc1WaveType(waveType) {
    this.oscillator1.waveType = waveType;
  }

  set osc2WaveType(waveType) {
    this.oscillator2.waveType = waveType;
  }

  set attack(value) {
    this.ampEnvelopeGenerator.attack = value === 0 ? config.synth.envelope.attack : value;
  }

  get attack() {
    return this.ampEnvelopeGenerator.attack;
  }

  set release(value) {
    this.ampEnvelopeGenerator.release = value === 0 ? config.synth.envelope.release : value;
  }

  get release() {
    return this.ampEnvelopeGenerator.release;
  }

  set sendFXGain(value) {
    this._sendFXGain.gain.value = value;
  }

  get sendFXGain() {
    return this._sendFXGain.gain.value;
  }

  set noiseGain(value) {
    this._noiseGain.gain.value = value;
  }

  get noiseGain() {
    return this._noiseGain.gain.value;
  }

  set osc1Gain(value) {
    this._osc1Gain.gain.value = value;
  }

  get osc1Gain() {
    return this._osc1Gain.gain.value;
  }

  set osc2Gain(value) {
    this._osc2Gain.gain.value = value;
  }

  get osc2Gain() {
    return this._osc2Gain.gain.value;
  }

  play() {
    if (this.active || this._disabled || !this.shouldPlay) {
      return;
    }
    this.active = true;
    this.ampEnvelopeGenerator.trigger(this.volume, this.pan);
    qAudioContext.triggerFilter();
  }

  stop() {
    if (!this.active) {
      return;
    }
    this.active = false;
    this.ampEnvelopeGenerator.close();
    // qAudioContext.closeFilter();
  }
}

export default SynthNode;