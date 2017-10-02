

class WaveShaper {
  constructor(audioContext, settings) {
    this.shaper = audioContext.createWaveShaper();
    this.shaper.curve = this.makeDistortionCurve(settings.ammount);
    this.shaper.oversample = settings.oversample;

    this.output = this.shaper;
    this.input = this.shaper;
    this.disabled = false;
  }

  set amount(value) {
    this.shaper.curve = this.makeDistortionCurve(value);
  }

  makeDistortionCurve(amount) {
    let k = typeof amount === 'number' ? amount : 50;
    let nSamples = 44100;
    let curve = new Float32Array(nSamples);
    let deg = Math.PI / 180;
    
    for (let i = 0 ; i < nSamples; ++i ) {
      let x = i * 2 / nSamples - 1;
      curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
    }
    return curve;
  }

  connect(node) {
    if (node.hasOwnProperty('input')) {
      this.output.connect(node.input);
    } else {
      this.output.connect(node);
    }
  }
}

export default WaveShaper;
