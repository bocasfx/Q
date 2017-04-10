class Amplifier {
  constructor(audioContext) {
    this.audioContext = audioContext;
    this.gain = audioContext.createGain();
    this.gain.gain.value = 0;
    this.input = this.gain;
    this.output = this.gain;
    this.amplitude = this.gain.gain;
  }

  set volume(vol) {
    let now = this.audioContext.currentTime;
    this.gain.gain.linearRampToValueAtTime(vol, now);
  }

  get volume() {
    return this.gain.gain.value;
  }

  connect(node) {
    if (node.hasOwnProperty('input')) {
      this.output.connect(node.input);
    } else {
      this.output.connect(node);
    };
  }
}

module.exports = Amplifier;
