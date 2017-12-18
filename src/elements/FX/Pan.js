import audioContext from '../../app/context/AudioContext';

class Pan {
  constructor() {
    this.gainL = audioContext.createGain();
    this.gainR = audioContext.createGain();
    this.gainL.gain.value = 1;
    this.gainR.gain.value = 1;
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
    this.pan = 0;
  }

  set value(pan) {
    this.pan = pan;
    let now = audioContext.currentTime;
    let leftVol = 1;
    let rightVol = 1;

    if (pan <= 0) {
      leftVol = 1;
      rightVol = 1 + pan;
    } else {
      rightVol = 1;
      leftVol = 1 - pan;
    }

    this.gainL.gain.linearRampToValueAtTime(leftVol, now);
    this.gainR.gain.linearRampToValueAtTime(rightVol, now);
  }

  get value() {
    return this.pan;
  }

  connect(node) {
    if (node.hasOwnProperty('input')) {
      this.output.connect(node.input);
    } else {
      this.output.connect(node);
    };
  }

  disconnect() {
    this.splitter.disconnect();
    this.gainL.disconnect();
    this.gainR.disconnect();
    this.output.disconnect();
  }
}

export default Pan;
