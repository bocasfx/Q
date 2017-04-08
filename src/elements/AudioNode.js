import config from '../config/config';
import Node from './Node';

class AudioNode extends Node {

  constructor(position) {
    super();
    this.position = position;
    this.sustain = config.audioNode.sustain;
    this.active = false;
    this.type = 'audio';
    this.onFinishedPlaying = this.onFinishedPlaying.bind(this);
    this.selected = false;
  }

  set src(filePath) {
    this.audio = new Audio(filePath);
    this.audio.addEventListener('ended', this.onFinishedPlaying);
  }

  set volume(value) {
    this.audio.volume = value;
  }

  get volume() {
    return this.audio.volume;
  }

  play() {
    if (this.active || !this.audio) {
      return;
    }
    this.active = true;
    this.audio.play();
  }

  onFinishedPlaying() {
    this.audio.currentTime = 0;
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
    canvasContext.strokeStyle = this.audio ? config.audioNode.strokeStyle : config.inactiveNode.strokeStyle;
    canvasContext.lineWidth = config.audioNode.lineWidth;
    canvasContext.setLineDash(config.audioNode.lineDash);
    canvasContext.fillStyle = this.audio? config.audioNode.fillStyle : config.inactiveNode.fillStyle;
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

export default AudioNode;
