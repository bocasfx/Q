

class Delay {
  constructor(audioContext, settings) {

    this.delay = audioContext.createDelay();
    this.gain = audioContext.createGain();

    this.delay.connect(this.gain);
    this.gain.connect(this.delay);

    this.output = this.delay;
    this.input = this.gain;

    this.delay.delayTime.value = settings.time;
    this.gain.gain.value = settings.feedback;
  }

  set time(value) {
    this.delay.delayTime.value = value;
  }

  set feedback(value) {
    this.gain.gain.value = value;
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
