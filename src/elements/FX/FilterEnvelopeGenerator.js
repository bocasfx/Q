import audioContext from '../../config/audio-context';

class FilterEnvelopeGenerator {
  constructor(envelope) {
    this.attack = envelope.attack;
    this.release = envelope.release;
    this.decay = envelope.decay;
  }

  trigger(frequency) {
    let now = audioContext.currentTime;
    this.param.cancelScheduledValues(now);
    this.param.linearRampToValueAtTime(0, now);
    this.param.linearRampToValueAtTime(frequency, now + this.attack);
  }

  close() {
    let now = audioContext.currentTime;
    this.param.cancelScheduledValues(now);
    this.param.linearRampToValueAtTime(0, now + this.release); 
  }

  connect(param) {
    this.param = param;
  }
}

module.exports = FilterEnvelopeGenerator;
