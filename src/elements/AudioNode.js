import config from '../config/config';
import uuidv1 from 'uuid/v1';

class AudioNode {

  constructor(position) {
    this.id = uuidv1();
    this.position = position;
    this.sustain = config.audioNode.sustain;
    this.active = false;
    this.type = 'audio';
    this.src = null;
    this.onFinishedPlaying = this.onFinishedPlaying.bind(this);
  }

  setAudioSource(filePath) {
    this.src = new Audio(filePath);
    this.src.addEventListener('ended', this.onFinishedPlaying);
  }

  play() {
    if (this.active || !this.src) {
      return;
    }
    this.active = true;
    this.src.play();
  }

  onFinishedPlaying() {
    this.src.currentTime = 0;
    this.active = false;
  }

  render(canvasContext) {
    let extraRadius = this.active ? 2 : 0;

    canvasContext.beginPath();
    canvasContext.arc(this.position[0] + 3, this.position[1] + 3, config.audioNode.radius + extraRadius, 0, 2 * Math.PI, false);
    canvasContext.fillStyle = config.audioNode.shadow;
    canvasContext.fill();

    canvasContext.beginPath();
    canvasContext.arc(this.position[0], this.position[1], config.audioNode.radius + extraRadius, 0, 2 * Math.PI, false);
    canvasContext.strokeStyle = config.audioNode.strokeStyle;
    canvasContext.lineWidth = config.audioNode.lineWidth;
    canvasContext.setLineDash(config.audioNode.lineDash);
    canvasContext.fillStyle = config.audioNode.fillStyle;
    canvasContext.fill();
    canvasContext.stroke();
  }
}

export default AudioNode;
