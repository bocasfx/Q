import config from '../config/config';
import Node from './Node';
import Oscillator from './Oscillator';
import Amplifier from './Amplifier';
import EnvelopeGenerator from './EnvelopeGenerator';

class SynthNode extends Node {

  constructor(position, audioContext) {
    super();
    this.position = position;
    this.active = false;

    this.oscillator1 = new Oscillator(audioContext);
    this.oscillator2 = new Oscillator(audioContext);
    this.amplifier = new Amplifier(audioContext);

    this.envelopeGenerator = new EnvelopeGenerator(config.synthNode.envelope, audioContext);

    this.oscillator1.connect(this.amplifier);
    this.oscillator2.connect(this.amplifier);
    this.envelopeGenerator.connect(this.amplifier.amplitude);
    this.amplifier.connect(audioContext.destination);

    this.type = 'synth';
    this.volume = 0;
    this.sustain = config.synthNode.sustain;
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

  set volume(vol) {
    this.amplifier.volume = vol;
  }

  get volume() {
    return this.amplifier.volume;
  }

  play() {
    if (this.active) {
      return;
    }
    this.activate();
    this.envelopeGenerator.trigger(this.volume);
  }

  stop() {
    if (!this.active) {
      return;
    }
    this.deactivate();
    this.envelopeGenerator.close();
  }

  activate() {
    this.active = true;
  }

  deactivate() {
    this.active = false;
  }

  render(canvasContext) {
    let extraRadius = this.active ? 2 : 0;

    canvasContext.beginPath();
    canvasContext.arc(this.position[0] + 3, this.position[1] + 3, config.midiNode.radius + extraRadius, 0, 2 * Math.PI, false);
    canvasContext.fillStyle = config.synthNode.shadow;
    canvasContext.fill();

    canvasContext.beginPath();
    canvasContext.arc(this.position[0], this.position[1], config.synthNode.radius + extraRadius, 0, 2 * Math.PI, false);
    canvasContext.strokeStyle = config.synthNode.strokeStyle;
    canvasContext.lineWidth = config.synthNode.lineWidth;
    canvasContext.setLineDash(config.synthNode.lineDash);
    canvasContext.fillStyle = config.synthNode.fillStyle;
    canvasContext.fill();
    canvasContext.stroke();

    if (this.selected) {
      canvasContext.beginPath();
      canvasContext.arc(this.position[0], this.position[1], config.selectedNode.radius, 0, 2 * Math.PI, false);
      canvasContext.strokeStyle = config.selectedNode.strokeStyle;
      canvasContext.lineWidth = config.selectedNode.lineWidth;
      canvasContext.setLineDash(config.selectedNode.lineDash);
      canvasContext.stroke();
    }
  }
}

export default SynthNode;