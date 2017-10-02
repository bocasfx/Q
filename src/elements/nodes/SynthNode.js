import config from '../../config/config';
import Node from './Node';
import Oscillator from '../FX/Oscillator';
import Amplifier from '../FX/Amplifier';
import AmpEnvelopeGenerator from '../FX/AmpEnvelopeGenerator';
import qAudioContext from '../../app/context/QAudioContext';
import NoiseGenerator from '../FX/NoiseGenerator';

class SynthNode extends Node {

  constructor(position) {
    super(position);

    this.oscillator1 = new Oscillator();
    this.oscillator2 = new Oscillator();
    this.amplifier = new Amplifier();
    this._sendFXGain = qAudioContext.ctx.createGain();
    this._mainGain = qAudioContext.ctx.createGain();
    this.noiseGenerator = new NoiseGenerator();
    this.ampEnvelopeGenerator = new AmpEnvelopeGenerator(config.synth.envelope);
    this.analyser = qAudioContext.ctx.createAnalyser();
    this.analyser.smoothingTimeConstant = 0.3;
    this.analyser.fftSize = 32;
    this.scriptProcessor = qAudioContext.ctx.createScriptProcessor(2048, 1, 1);
    this.scriptProcessor.onaudioprocess = this.renderBars.bind(this);

    this._noiseGain = qAudioContext.ctx.createGain();
    this._noiseGain.gain.value = 0.0;

    this._osc1Gain = qAudioContext.ctx.createGain();
    this._osc1Gain.gain.value = 1.0;

    this._osc2Gain = qAudioContext.ctx.createGain();
    this._osc2Gain.gain.value = 1.0;

    this.oscillator1.connect(this._osc1Gain);
    this._osc1Gain.connect(this.amplifier.input);

    this.oscillator2.connect(this._osc2Gain);
    this._osc2Gain.connect(this.amplifier.input);

    this.noiseGenerator.connect(this._noiseGain);
    this._noiseGain.connect(this.amplifier.input);

    this.ampEnvelopeGenerator.connect(this.amplifier.amplitudeL, this.amplifier.amplitudeR);

    this.amplifier.connect(this._sendFXGain);
    this.amplifier.connect(this._mainGain);
    this._mainGain.connect(this.analyser);
    this.analyser.connect(this.scriptProcessor);
    this.scriptProcessor.connect(qAudioContext.destination);

    this._mainGain.connect(qAudioContext.destination);
    this._mainGain.gain.value = 0.8;

    this._sendFXGain.connect(qAudioContext.fxDestination);
    this.sendFXGain = 0;

    this.type = 'synth';

    this.nodeImg = new Image();
    this.nodeImg.src = './icons/elements/synth-node.png';

    this.activeNodeImg = new Image();
    this.activeNodeImg.src = './icons/elements/synth-node-active.png';

    this.probabilityNodeImg = new Image();
    this.probabilityNodeImg.src = './icons/elements/synth-node-probability.png';
  }

  set osc1Freq(freq) {
    this.oscillator1.frequency = freq;
  }

  get osc1Freq() {
    return this.oscillator1.frequency;
  }

  set osc2Freq(freq) {
    this.oscillator2.frequency = freq;
  }

  get osc2Freq() {
    return this.oscillator2.frequency;
  }

  set osc1WaveType(waveType) {
    this.oscillator1.waveType = waveType;
  }

  set osc2WaveType(waveType) {
    this.oscillator2.waveType = waveType;
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

  set sendFXGain(value) {
    this._sendFXGain.gain.value = value;
  }

  get sendFXGain() {
    return this._sendFXGain.gain.value;
  }

  set noiseGain(value) {
    this._noiseGain.gain.value = value;
  }

  get noiseGain() {
    return this._noiseGain.gain.value;
  }

  set osc1Gain(value) {
    this._osc1Gain.gain.value = value;
  }

  get osc1Gain() {
    return this._osc1Gain.gain.value;
  }

  set osc2Gain(value) {
    this._osc2Gain.gain.value = value;
  }

  get osc2Gain() {
    return this._osc2Gain.gain.value;
  }

  set volume(value) {
    this._mainGain.gain.value = value;
  }

  get volume() {
    return this._mainGain.gain.value;
  }

  disconnect() {
    this.oscillator1.disconnect();
    this._osc1Gain.disconnect();
    this.oscillator2.disconnect();
    this._osc2Gain.disconnect();
    this.noiseGenerator.disconnect();
    this._noiseGain.disconnect();
    this.amplifier.disconnect();
    this.amplifier.disconnect();
    this._mainGain.disconnect();
    this._sendFXGain.disconnect();
  }

  play() {
    if (this.active || this._disabled || !this.shouldPlay) {
      return;
    }
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

  renderBars() {
    if (!this.volumeMeter) {
      return;
    }

    let dataArray = new Uint8Array(16);
    this.analyser.getByteFrequencyData(dataArray);
    let volumeMeterHeight = 0;

    for(var i = 0; i < 16; i++) {
      volumeMeterHeight += dataArray[i];
    }
    volumeMeterHeight /= 16;

    this.volumeMeter.clearRect(0, 0, 5, 200);
    this.volumeMeter.fillStyle = 'gold';
    this.volumeMeter.fillRect(0, 200 - volumeMeterHeight, 5, 200);
  }
}

export default SynthNode;