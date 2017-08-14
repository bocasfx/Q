

class Delay {
  constructor(audioContext, settings) {

    this.delay = audioContext.createDelay();
    this.gain = audioContext.createGain();
    this.filter = audioContext.createBiquadFilter();

    this.delay.connect(this.gain);
    this.gain.connect(this.filter);
    this.filter.connect(this.delay);

    this.output = this.filter;
    this.input = this.filter;

    this.delay.delayTime.value = settings.time;
    this.gain.gain.value = settings.feedback;
    this.filter.frequency.value = settings.cutoffFrequency;
  }

  set time(value) {
    this.delay.delayTime.value = value;
  }

  set feedback(value) {
    this.gain.gain.value = value;
  }

  set cutoffFrequency(value) {
    this.filter.frequency.value = value;
  }

  connect(node) {
    if (node.hasOwnProperty('input')) {
      this.output.connect(node.input);
    } else {
      this.output.connect(node);
    }
  }
}

module.exports = Delay;
