import audioContext from '../config/audio-context';

class Amplifier {
  constructor() {
    this.gainL = audioContext.createGain();
    this.gainR = audioContext.createGain();
    this.gainL.gain.value = 0;
    this.gainR.gain.value = 0;
    this.splitter = audioContext.createChannelSplitter(2);
    this.merger = audioContext.createChannelMerger(2);
    this.splitter.connect(this.gainL, 0);
    this.splitter.connect(this.gainR, 1);
    this.gainL.connect(this.merger, 0, 0);
    this.gainR.connect(this.merger, 0, 1);
    this.input = this.splitter;
    this.output = this.merger;
    this.amplitudeL = this.gainL.gain;
    this.amplitudeR = this.gainR.gain;
  }

  set volume(vol) {
    let now = audioContext.currentTime;
    this.gainL.gain.linearRampToValueAtTime(vol, now);
    this.gainR.gain.linearRampToValueAtTime(vol, now);
  }

  get volume() {
    return (this.gainL.gain.value + this.gainR.gain.value) / 2;
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
