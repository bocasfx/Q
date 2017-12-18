import Node from './Node';
import qAudioContext from '../../app/context/QAudioContext';
import EnvelopeGenerator from 'fastidious-envelope-generator';
import audioContext from '../../app/context/AudioContext';
import config from '../../config/config';
import Pan from '../FX/Pan';

class AudioNode extends Node {

  constructor(position) {
    super(position);
    this.type = 'audio';
    this.active = false;

    this.nodeImg = new Image();
    this.nodeImg.src = './icons/elements/audio-node.png';

    this.activeNodeImg = new Image();
    this.activeNodeImg.src = './icons/elements/audio-node-active.png';

    this.probabilityNodeImg = new Image();
    this.probabilityNodeImg.src = './icons/elements/audio-node-probability.png';

    this.vca = qAudioContext.ctx.createGain();

    this.envelopeGenerator = new EnvelopeGenerator(audioContext, this.vca.gain);
    this.envelopeGenerator.attackTime = config.synth.envelope.attack;
    this.envelopeGenerator.releaseTime = config.synth.envelope.release;

    this._pan = new Pan();

    this._sendFXGain = qAudioContext.ctx.createGain();
    this.sendFXGain = 0;

    this._mainGain = qAudioContext.ctx.createGain();
    this._mainGain.gain.value = 0.8;

    this.decodedAudioData = null;
    this.path = '';
  }

  setAudioSrc(dataBuffer, path) {
    qAudioContext.ctx.decodeAudioData(dataBuffer.buffer, (buffer) => {
      this.decodedAudioData = buffer;
      this.path = path;
      this.createDataSource();
    }, (error) => {
      alert(error);
    });
  }

  createDataSource() {
    let src = qAudioContext.ctx.createBufferSource();
    src.buffer = this.decodedAudioData;
    src.connect(this.vca);
    this.vca.connect(this._pan.input);
    this._pan.connect(this._sendFXGain);
    this._pan.connect(this._mainGain);

    this._mainGain.connect(qAudioContext.destination);

    this._sendFXGain.connect(qAudioContext.fxDestination);

    src.start();
    src.onended = () => {
      src.disconnect();
    };
  }

  set sendFXGain(value) {
    this._sendFXGain.gain.value = value;
  }

  get sendFXGain() {
    return this._sendFXGain.gain.value;
  }

  set attack(value) {
    this.envelopeGenerator.attackTime = value;
  }

  get attack() {
    return this.envelopeGenerator.attackTime;
  }

  set release(value) {
    this.envelopeGenerator.releaseTime = value;
  }

  get release() {
    return this.envelopeGenerator.releaseTime;
  }

  set volume(value) {
    this._mainGain.gain.value = value;
  }

  get volume() {
    return this._mainGain.gain.value;
  }

  set pan(value) {
    this._pan.value = value;
  }

  get pan() {
    return this._pan.value;
  }

  play() {
    if (this.active || !this.decodedAudioData || !this.shouldPlay) {
      return;
    }
    this.createDataSource();
    this.active = true;
    this.envelopeGenerator.gateOn();
    qAudioContext.triggerFilter();
  }

  stop() {
    if (!this.active) {
      return;
    }
    this.active = false;
    this.envelopeGenerator.gateOff();
  }
}

export default AudioNode;
