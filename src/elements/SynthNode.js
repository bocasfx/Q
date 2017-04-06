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
    this.oscillator1 = audioContext.createOscillator();
    this.oscillator2 = audioContext.createOscillator();
    this.gainNode = audioContext.createGain();
    this.oscillator1.connect(this.gainNode);
    this.oscillator2.connect(this.gainNode);
    this.gainNode.connect(audioContext.destination);
    this.gainNode.gain.value = 0;
    this.velocity = 1.0;
    this.oscillator1.type = 'sine';
    this.oscillator2.type = 'sine';
    this.osc1Freq = 120;
    this.osc2Freq = 100;
    this.oscillator1.start();
    this.oscillator2.start();
    this.type = 'synth';
    this.gainValue = 1;
  }

  set osc1Freq(freq) {
    this.oscillator1.frequency.value = freq;
  }

  set osc2Freq(freq) {
    this.oscillator2.frequency.value = freq;
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