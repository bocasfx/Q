import config from '../config/config';
import uuidv1 from 'uuid/v1';
import Node from './Node';

class SynthNode extends Node {

  constructor(position, audioContext) {
    super();
    this.id = uuidv1();
    this.position = position;
    this.sustain = config.synthNode.sustain;
    this.active = false;
    this.oscillator = audioContext.createOscillator();
    this.gainNode = audioContext.createGain();
    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(audioContext.destination);
    this.gainNode.gain.value = 0;
    this.velocity = 1.0;
    this.oscillator.type = 'sine';
    this.frequency = 440;
    this.oscillator.start();
    this.type = 'synth';
    this.gainValue = 1;
  }

  set frequency(freq) {
    this.oscillator.frequency.value = freq;
  }

  get frequency() {
    return this.oscillator.frequency.value;
  }

  set volume(value) {
    this.gainValue = value;
  }

  get volume() {
    return this.gainNode.gain.value;
  }

  play() {
    if (this.active) {
      return;
    }
    this.activate();
    setTimeout(() => {
      this.deactivate();
    }, this.sustain);
  }

  activate() {
    this.active = true;
    this.gainNode.gain.value = this.gainValue;
  }

  deactivate() {
    this.gainNode.gain.value = 0;
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
  }
}

export default SynthNode;