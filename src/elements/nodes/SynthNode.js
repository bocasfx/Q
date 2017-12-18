import config from '../../config/config';
import Node from './Node';
import Oscillator from '../FX/Oscillator';
import EnvelopeGenerator from 'fastidious-envelope-generator';
import qAudioContext from '../../app/context/QAudioContext';
import audioContext from '../../app/context/AudioContext';
import NoiseGenerator from '../FX/NoiseGenerator';
import Pan from '../FX/Pan';

class SynthNode extends Node {

  constructor(position) {
    super(position);

    this.oscillator1 = new Oscillator();
    this.oscillator2 = new Oscillator();
    this._pan = new Pan();
    this._pan.value = 0;
    this._sendFXGain = qAudioContext.ctx.createGain();
    this._mainGain = qAudioContext.ctx.createGain();
    this.vca = qAudioContext.ctx.createGain();
    this.noiseGenerator = new NoiseGenerator();
    this.envelopeGenerator = new EnvelopeGenerator(audioContext, this.vca.gain);
    this.envelopeGenerator.attackTime = config.synth.envelope.attack;
    this.envelopeGenerator.releaseTime = config.synth.envelope.release;

    this._noiseGain = qAudioContext.ctx.createGain();
    this._noiseGain.gain.value = 0.0;

    this._osc1Gain = qAudioContext.ctx.createGain();
    this._osc1Gain.gain.value = 1.0;

    this._osc2Gain = qAudioContext.ctx.createGain();
    this._osc2Gain.gain.value = 1.0;

    this.oscillator1.connect(this._osc1Gain);
    this._osc1Gain.connect(this.vca);

    this.oscillator2.connect(this._osc2Gain);
    this._osc2Gain.connect(this.vca);

    this.noiseGenerator.connect(this._noiseGain);
    this._noiseGain.connect(this.vca);

    this.vca.connect(this._pan.input);

    this._pan.connect(this._mainGain);
    this._pan.connect(this._sendFXGain);

    this._mainGain.connect(qAudioContext.destination);
    this._mainGain.gain.value = 0.8;

    this._sendFXGain.connect(qAudioContext.fxDestination);
    this.sendFXGain = 0;

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
    this.envelopeGenerator.attackTime = value;
  }

  get attack() {
    return this.envelopeGenerator.attackTime;
  }

  set release(value) {
    this.envelopeGenerator.releaseTime = value;
  }

  get release() {
    return this.envelopeGenerator.releaseTime;
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

  set volume(value) {
    this._mainGain.gain.value = value;
  }

  get volume() {
    return this._mainGain.gain.value;
  }

  set pan(value) {
    this._pan.value = value;
  }

  get pan() {
    return this._pan.value;
  }

  disconnect() {
    this.oscillator1.disconnect();
    this._osc1Gain.disconnect();
    this.oscillator2.disconnect();
    this._osc2Gain.disconnect();
    this.noiseGenerator.disconnect();
    this._noiseGain.disconnect();
    this._mainGain.disconnect();
    this._sendFXGain.disconnect();
  }

  play() {
    if (this.active || this._disabled || !this.shouldPlay) {
      return;
    }
    this.active = true;
    this.envelopeGenerator.gateOn();
    qAudioContext.triggerFilter();
  }

  stop() {
    if (!this.active) {
      return;
    }
    this.envelopeGenerator.gateOff();
    this.active = false;
  }
}

export default SynthNode;