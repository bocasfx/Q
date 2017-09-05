import audioContext from '../../app/context/AudioContext';

class FilterEnvelopeGenerator {
  constructor(envelope) {
    this.attack = envelope.attack;
    this.release = envelope.release;
    this.decay = envelope.decay;
  }

  trigger(frequency) {
    let now = audioContext.currentTime;
    let freq = frequency;
    this.param.cancelScheduledValues(now);
    this.param.linearRampToValueAtTime(0.01, now);
    this.param.linearRampToValueAtTime(freq, now + this.attack);
  }

  connect(param) {
    this.param = param;
  }
}

module.exports = FilterEnvelopeGenerator;
