import qAudioContext from '../../config/context/QAudioContext';

class NoiseGenerator {

  constructor() {

    this.generatePinkNoise();
  }

  generateWhiteNoise() {
    let bufferSize = 2 * qAudioContext.ctx.sampleRate;
    let noiseBuffer = qAudioContext.ctx.createBuffer(1, bufferSize, qAudioContext.ctx.sampleRate);
    let output = noiseBuffer.getChannelData(0);

    for (var i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
    }

    this.generator = qAudioContext.ctx.createBufferSource();
    this.generator.buffer = noiseBuffer;
    this.generator.loop = true;
    this.generator.start(0);
  }

  generatePinkNoise() {

    let bufferSize = 2 * qAudioContext.ctx.sampleRate;
    let noiseBuffer = qAudioContext.ctx.createBuffer(1, bufferSize, qAudioContext.ctx.sampleRate);
    let output = noiseBuffer.getChannelData(0);
    let b0, b1, b2, b3, b4, b5, b6;
    b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;

    for (var i = 0; i < bufferSize; i++) {
      let white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.025;
      b6 = white * 0.115926;
    }

    this.generator = qAudioContext.ctx.createBufferSource();
    this.generator.buffer = noiseBuffer;
    this.generator.loop = true;
    this.generator.start(0);
  }

  connect(node) {
    if (node.hasOwnProperty('input')) {
      this.generator.connect(node.input);
    } else {
      this.generator.connect(node);
    }
  }
}

export default NoiseGenerator;