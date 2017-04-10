class EnvelopeGenerator {
  constructor(envelope, audioContext) {
    this.audioContext = audioContext;
    this.attack = envelope.attack;
    this.release = envelope.release;
    this.sustain = envelope.sustain;
    this.decay = envelope.decay;
  }

  trigger() {
    let now = this.audioContext.currentTime;
    this.param.cancelScheduledValues(now);
    this.param.linearRampToValueAtTime(0, now);
    this.param.linearRampToValueAtTime(1, now + this.attack);
  }

  close() {
    let now = this.audioContext.currentTime;
    this.param.cancelScheduledValues(now);
    this.param.linearRampToValueAtTime(0, now + this.release); 
  }

  connect(param) {
    this.param = param;
  }
}

module.exports = EnvelopeGenerator;
