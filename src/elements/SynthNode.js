import config from '../config/config';
import Node from './Node';
import Oscillator from './Oscillator';
import Amplifier from './Amplifier';
import EnvelopeGenerator from './EnvelopeGenerator';
import qAudioContext from './QAudioContext';

class SynthNode extends Node {

  constructor(position) {
    super(position);

    this.oscillator1 = new Oscillator();
    this.oscillator2 = new Oscillator();
    this.amplifier = new Amplifier();
    this.sendAmp = new Amplifier();

    this.envelopeGenerator = new EnvelopeGenerator(config.synth.envelope);

    this.oscillator1.connect(this.amplifier);
    this.oscillator2.connect(this.amplifier);
    this.envelopeGenerator.connect(this.amplifier.amplitudeL, this.amplifier.amplitudeR);
    this.amplifier.connect(qAudioContext.destination);
    this.amplifier.connect(this.sendAmp);
    this.sendAmp.connect(qAudioContext.delayDestination);
    this.sendAmp.volume = 0;

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
    this.envelopeGenerator.attack = value === 0 ? config.synth.envelope.attack : value;
  }

  get attack() {
    return this.envelopeGenerator.attack;
  }

  set release(value) {
    this.envelopeGenerator.release = value === 0 ? config.synth.envelope.release : value;
  }

  get release() {
    return this.envelopeGenerator.release;
  }

  set sendFXGain(value) {
    this.sendAmp.volume = value;
  }

  get sendFXGain() {
    return this.sendAmp.volume;
  }

  play() {
    if (this.active || this._disabled || !this.shouldPlay) {
      return;
    }
    this.active = true;
    this.envelopeGenerator.trigger(this.volume, this.pan);
  }

  stop() {
    if (!this.active) {
      return;
    }
    this.active = false;
    this.envelopeGenerator.close();
  }
}

export default SynthNode;