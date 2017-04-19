import config from '../config/config';
import Node from './Node';
import Oscillator from './Oscillator';
import Amplifier from './Amplifier';
import EnvelopeGenerator from './EnvelopeGenerator';

class SynthNode extends Node {

  constructor(position, audioContext) {
    super(position);

    this.oscillator1 = new Oscillator(audioContext);
    this.oscillator2 = new Oscillator(audioContext);
    this.amplifier = new Amplifier(audioContext);

    this.envelopeGenerator = new EnvelopeGenerator(config.synthNode.envelope, audioContext);

    this.oscillator1.connect(this.amplifier);
    this.oscillator2.connect(this.amplifier);
    this.envelopeGenerator.connect(this.amplifier.amplitudeL, this.amplifier.amplitudeR);
    this.amplifier.connect(audioContext.destination);

    this.type = 'synth';

    this.nodeImg = new Image();
    this.nodeImg.src = './icons/elements/synth-node.png';

    this.activeNodeImg = new Image();
    this.activeNodeImg.src = './icons/elements/synth-node-active.png';
  }

  set osc1Freq(freq) {
    this.oscillator1.frequency = freq;
  }

  set osc2Freq(freq) {
    this.oscillator2.frequency = freq;
  }

  set osc1WaveType(waveType) {
    this.oscillator1.waveType = waveType;
  }

  set osc2WaveType(waveType) {
    this.oscillator2.waveType = waveType;
  }

  set attack(value) {
    this.envelopeGenerator.attack = value;
  }

  get attack() {
    return this.envelopeGenerator.attack;
  }

  set release(value) {
    this.envelopeGenerator.release = value;
  }

  get release() {
    return this.envelopeGenerator.release;
  }

  play() {
    if (this.active) {
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