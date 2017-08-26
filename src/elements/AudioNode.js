import Node from './Node';
import qAudioContext from './QAudioContext';
import Amplifier from './SynthNode/Amplifier';
import AmpEnvelopeGenerator from './SynthNode/AmpEnvelopeGenerator';
import config from '../config/config';

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
    this.decodedAudioData = null;
  }

  set src(dataBuffer) {
    qAudioContext.ctx.decodeAudioData(dataBuffer.buffer, (buffer) => {
      this.decodedAudioData = buffer;
      this.createDataSource();
    }, () => {
      // TODO: notification.
    });
  }

  createDataSource() {
    this._src = qAudioContext.ctx.createBufferSource();
    this._src.buffer = this.decodedAudioData;
    this._src.connect(this.amplifier.input);
    this.ampEnvelopeGenerator.connect(this.amplifier.amplitudeL, this.amplifier.amplitudeR);
    this.amplifier.connect(qAudioContext.destination);
    this.amplifier.connect(this._sendFXGain);
    this._sendFXGain.connect(qAudioContext.fxDestination.input);
    this._sendFXGain.volume = 0;
    this._src.start();
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

  play() {
    if (this.active || !this.decodedAudioData || !this.shouldPlay) {
      return;
    }
    this.createDataSource();
    this.active = true;
    this.ampEnvelopeGenerator.trigger(this.volume, this.pan);
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
