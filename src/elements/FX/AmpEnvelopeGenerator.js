import audioContext from '../../app/context/AudioContext';

class AmpEnvelopeGenerator {
  constructor(envelope) {
    this.attack = envelope.attack;
    this.release = envelope.release;
    this.decay = envelope.decay;
  }

  trigger(volume, pan) {
    let panL = pan <= 0 ? 1 : 1 - pan;
    let panR = pan >= 0 ? 1 : 1 - (-1 * pan);
    let now = audioContext.currentTime;
    this.paramL.cancelScheduledValues(now);
    this.paramL.linearRampToValueAtTime(0.01, now);
    this.paramL.linearRampToValueAtTime(volume * panL, now + this.attack);

    this.paramR.cancelScheduledValues(now);
    this.paramR.linearRampToValueAtTime(0.01, now);
    this.paramR.linearRampToValueAtTime(volume * panR, now + this.attack);
  }

  close() {
    let now = audioContext.currentTime;
    this.paramL.cancelScheduledValues(now);
    this.paramL.linearRampToValueAtTime(0, now + this.release); 

    this.paramR.cancelScheduledValues(now);
    this.paramR.linearRampToValueAtTime(0, now + this.release); 
  }

  connect(paramL, paramR) {
    this.paramL = paramL;
    this.paramR = paramR;
  }
}

module.exports = AmpEnvelopeGenerator;
