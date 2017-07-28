import audioContext from '../config/audio-context';

class Delay {
  constructor(time, feedback, cutoffFreq) {

    this.delay = audioContext.createDelay();
    this.feedback = audioContext.createGain();
    this.filter = audioContext.createBiquadFilter();

    this.delay.connect(this.feedback);
    this.feedback.connect(this.filter);
    this.filter.connect(this.delay);

    this.input = this.delay;
    this.output = this.delay;

    this.delay.delayTime.value = time;
    this.feedback.gain.value = feedback;
    this.filter.frequency.value = cutoffFreq;
  }

  // set time(value) {
  //   this.delay.delayTime.value = value;
  // }

  // get time() {
  //   return this.delay.delayTime.value;
  // }

  // set feedback(value) {
  //   this.feedback.gain.value = value;
  // }

  // get feedback() {
  //   return this.feedback.gain.value;
  // }

  // set cutoffFreq(value) {
  //   this.filter.frequency.value = value;
  // }

  // get cutoffFreq() {
  //   return this.filter.frequency.value;
  // }

  connect(node) {
    if (node.hasOwnProperty('input')) {
      this.output.connect(node.input);
    } else {
      this.output.connect(node);
    }
  }
}

module.exports = Delay;
