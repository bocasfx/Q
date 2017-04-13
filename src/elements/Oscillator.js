class Oscillator {

  constructor(audioContext) {
    this.audioContext = audioContext;
    this.oscillator = audioContext.createOscillator();
    this.waveType = 'sine';
    this.frequency = 60;
    this.oscillator.start(0);

    this.input = this.oscillator;
    this.output = this.oscillator;
  }

  set frequency(freq) {
    this.oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
  }

  get frequency() {
    return this.oscillator.frequency.value;
  }

  set waveType(waveType) {
    this.oscillator.type = waveType;
  }

  get waveType() {
    return this.oscillator.type;
  }

  connect(node) {
    if (node.hasOwnProperty('input')) {
      this.output.connect(node.input);
    } else {
      this.output.connect(node);
    }
  }
}

module.exports = Oscillator;
