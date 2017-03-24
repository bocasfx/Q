import config from '../config/config';
import { normalizeFrequency, normalizeVelocity } from '../utils/utils';

class Node {

  constructor(position, audioContext) {
    this.position = position;
    this.sustain = 500;
    this.playing = false;
    this.oscillator = audioContext.createOscillator();
    this.gainNode = audioContext.createGain();
    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(audioContext.destination);
    this.gainNode.gain.value = 0;
    this.velocity = normalizeVelocity(position[0]);
    this.oscillator.type = 'sine';
    this.oscillator.frequency.value = normalizeFrequency(position[1]);
    this.oscillator.start();
  }

  play() {
    if (this.playing) {
      return;
    }
    this.gainNode.gain.value = this.velocity;
    this.playing = true;
    setTimeout(() => {
      this.gainNode.gain.value = 0;
      this.playing = false;
    }, this.sustain);
  }

  render(canvasContext) {
    canvasContext.beginPath();
    canvasContext.arc(this.position[0], this.position[1], config.node.radius, 0, 2 * Math.PI, false);
    canvasContext.strokeStyle = config.node.strokeStyle;
    canvasContext.lineWidth = config.node.lineWidth;
    canvasContext.setLineDash(config.node.lineDash);
    canvasContext.fillStyle = config.node.fillStyle;
    canvasContext.fill();
    canvasContext.stroke();
  }
}

export default Node;