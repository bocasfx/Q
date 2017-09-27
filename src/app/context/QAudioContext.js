import config from '../../config/config';
import Delay from '../../elements/FX/Delay';
import Filter from '../../elements/FX/Filter';
import WaveShaper from '../../elements/FX/WaveShaper';
import Reverb from '../../elements/FX/Reverb';

class QAudioContext {
  constructor() {
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();

    this.fxDestination = this.ctx.createGain();
    this.waveShaper = new WaveShaper(this.ctx, config.fx.waveShaper);
    this.filter = new Filter(this.ctx, config.fx.filter);
    this.delay = new Delay(this.ctx, config.fx.delay);
    this.reverb = new Reverb(this.ctx, config.fx.reverb);

    this.analyser = this.ctx.createAnalyser();

    this.fxDestination.connect(this.waveShaper.input, 0, 0);
    this.waveShaper.connect(this.filter);
    this.filter.connect(this.delay.input);
    this.filter.connect(this.reverb.input);
    this.filter.connect(this.analyser);
    this.reverb.connect(this.analyser);
    this.delay.connect(this.analyser);
    this.analyser.connect(this.ctx.destination);

    // this.analyser.fftSize = 2048;
    this.analyser.fftSize = 256;
  }

  get destination() {
    return this.analyser;
  }

  set time(value) {
    this.delay.time = value;
  }

  set feedback(value) {
    this.delay.feedback = value;
  }

  set cutoffFrequency(value) {
    this.delay.cutoffFrequency = value;
  }

  set filterCutoffFrequency(value) {
    this.filter.frequency = value;
  }

  set filterQ(value) {
    this.filter.q = value;
  }

  set filterAttack(value) {
    this.filter.attack = value;
  }

  set filterRelease(value) {
    this.filter.release = value;
  }

  set waveShaperAmount(value) {
    this.waveShaper.amount = value;
  }

  set reverbAmount(value) {
    this.reverb.amount = value;
  }

  set reverbImpulseResponse(value) {
    this.reverb.impulseResponse = value;
  }

  get reverbImpulseResponse() {
    return this.reverb.impulseResponse;
  }

  triggerFilter() {
    this.filter.trigger();
  }

  renderWaveform(canvasContext, width, height) {
    let bufferLength = this.analyser.frequencyBinCount;
    let dataArray = new Uint8Array(bufferLength);
    this.analyser.getByteTimeDomainData(dataArray);

    canvasContext.lineWidth = 2;
    canvasContext.strokeStyle = 'rgba(127, 127, 127, 0.4)';
    canvasContext.beginPath();

    let sliceWidth = width * 1.0 / bufferLength;
    let x = 0;

    for(let i = 0; i < bufferLength; i++) {
      let v = dataArray[i] / 128.0;
      let y = v * height/2;

      if(i === 0) {
        canvasContext.moveTo(x, y);
      } else {
        canvasContext.lineTo(x, y);
      }

      x += sliceWidth;
    }
    canvasContext.lineTo(width, height/2);
    canvasContext.stroke(); 
  }

  renderBars(canvasContext, width, height) {
    let bufferLength = this.analyser.frequencyBinCount;
    let dataArray = new Uint8Array(bufferLength);
    this.analyser.getByteFrequencyData(dataArray);

    var barWidth = (width / bufferLength) * 2.5;
    var barHeight;
    var x = 0;

    for(var i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i]/2;

      canvasContext.fillStyle = 'rgba(127, 127, 127, 0.4)';
      canvasContext.fillRect(x, height - barHeight / 2, barWidth, barHeight);

      x += barWidth + 1;
    }
  }

  render(canvasContext, width, height) {
    this.renderBars(canvasContext, width, height);
  }
}

let audioCtx = new QAudioContext();
export default audioCtx;
