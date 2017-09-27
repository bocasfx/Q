import Node from './Node';
import qAudioContext from '../../app/context/QAudioContext';
import Amplifier from '../FX/Amplifier';
import AmpEnvelopeGenerator from '../FX/AmpEnvelopeGenerator';
import config from '../../config/config';

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

    this.amplifier = new Amplifier();
    this.amplifier.volume = 0;
    this.ampEnvelopeGenerator = new AmpEnvelopeGenerator(config.synth.envelope);

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
    src.connect(this.amplifier.input);
    this.ampEnvelopeGenerator.connect(this.amplifier.amplitudeL, this.amplifier.amplitudeR);
    this.amplifier.connect(this._sendFXGain);
    this.amplifier.connect(this._mainGain);

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
    this.ampEnvelopeGenerator.attack = value === 0 ? config.synth.envelope.attack : value;
  }

  get attack() {
    return this.ampEnvelopeGenerator.attack;
  }

  set release(value) {
    this.ampEnvelopeGenerator.release = value === 0 ? config.synth.envelope.release : value;
  }

  get release() {
    return this.ampEnvelopeGenerator.release;
  }

  set volume(value) {
    this._mainGain.gain.value = value;
  }

  get volume() {
    return this._mainGain.gain.value;
  }

  play() {
    if (this.active || !this.decodedAudioData || !this.shouldPlay) {
      return;
    }
    this.createDataSource();
    this.active = true;
    this.ampEnvelopeGenerator.trigger(this.pan);
    qAudioContext.triggerFilter();
  }

  stop() {
    if (!this.active) {
      return;
    }
    this.active = false;
    this.ampEnvelopeGenerator.close();
  }
}

export default AudioNode;
