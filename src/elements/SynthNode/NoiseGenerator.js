import qAudioContext from '../QAudioContext';

class NoiseGenerator {

  constructor() {

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

  connect(node) {
    if (node.hasOwnProperty('input')) {
      this.generator.connect(node.input);
    } else {
      this.generator.connect(node);
    }
  }
}

export default NoiseGenerator;