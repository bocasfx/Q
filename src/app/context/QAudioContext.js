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

    this.analyser.fftSize = 128;
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
    canvasContext.strokeStyle = 'rgba(255, 215, 0, 0.75)';
    canvasContext.beginPath();

    let sliceWidth = width * 1.0 / (bufferLength - 1.0);
    let x = 0.0;
    let half = height / 2.0;

    for(let i = 0; i < bufferLength; i++) {
      let v = dataArray[i] / 128.0;
      let y = v * half;

      if(i === 0) {
        canvasContext.moveTo(x, y);
      } else {
        canvasContext.lineTo(x, y);
      }

      x += sliceWidth;
    }
    // canvasContext.lineTo(width, height/2);
    canvasContext.stroke();
    canvasContext.beginPath();
    canvasContext.moveTo(0, half);
    canvasContext.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    canvasContext.lineTo(width, half);
    canvasContext.stroke(); 
  }

  renderBars(canvasContext, width, height) {
    let bufferLength = this.analyser.frequencyBinCount;
    let dataArray = new Uint8Array(bufferLength);
    this.analyser.getByteFrequencyData(dataArray);

    var barWidth = (width / bufferLength) * 2.5;
    var barHeight;
    var x = 0.0;
    let half = height / 2.0;
    canvasContext.fillStyle = 'rgba(255, 215, 0, 0.75)';

    for(var i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i] / 2.0;
      canvasContext.fillRect(x, (height - barHeight) / 2.0, barWidth, barHeight);
      x += barWidth + 1;
    }

    canvasContext.beginPath();
    canvasContext.moveTo(0, half);
    canvasContext.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    canvasContext.lineTo(width, half);
    canvasContext.stroke();
  }

  render(vizType, canvasContext, width, height) {
    switch (vizType) {
      case 'visualizerOff':
        return;

      case 'visualizerWaveform':
        return this.renderWaveform(canvasContext, width, height);

      case 'visualizerBars':
        return this.renderBars(canvasContext, width, height);

      default:
        return;
    }
  }
}

let audioCtx = new QAudioContext();
export default audioCtx;
