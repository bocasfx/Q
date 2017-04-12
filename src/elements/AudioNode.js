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

    this.nodeImg = new Image();
    this.nodeImg.src = './icons/elements/audio-node.png';

    this.activeNodeImg = new Image();
    this.activeNodeImg.src = './icons/elements/audio-node-active.png';
  }

  set src(filePath) {
    this.audio = new Audio(filePath);
    this.audio.addEventListener('ended', this.onFinishedPlaying);
  }

  set volume(value) {
    if (this.audio) {
      this.audio.volume = value;
    }
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
}

export default AudioNode;
