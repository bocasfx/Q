import config from '../config/config';
import { normalizeFrequency, normalizeVelocity } from '../utils/utils';
import uuidv1 from 'uuid/v1';

class Node {

  constructor(position, audioContext) {
    this.id = uuidv1();
    this.position = position;
    this.sustain = config.node.sustain;
    this.playing = false;
    this.oscillator = audioContext.createOscillator();
    this.gainNode = audioContext.createGain();
    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(audioContext.destination);
    this.gainNode.gain.value = 0;
    this.velocity = normalizeVelocity(position[1]);
    this.oscillator.type = 'sine';
    this.oscillator.frequency.value = normalizeFrequency(position[0]);
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
    let extraRadius = this.playing ? 2 : 0;

    canvasContext.beginPath();
    canvasContext.arc(this.position[0] + 3, this.position[1] + 3, config.midiNode.radius + extraRadius, 0, 2 * Math.PI, false);
    canvasContext.fillStyle = config.node.shadow;
    canvasContext.fill();

    canvasContext.beginPath();
    canvasContext.arc(this.position[0], this.position[1], config.node.radius + extraRadius, 0, 2 * Math.PI, false);
    canvasContext.strokeStyle = config.node.strokeStyle;
    canvasContext.lineWidth = config.node.lineWidth;
    canvasContext.setLineDash(config.node.lineDash);
    canvasContext.fillStyle = config.node.fillStyle;
    canvasContext.fill();
    canvasContext.stroke();
  }
}

export default Node;