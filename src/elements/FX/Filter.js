import config from '../../config/config';
import FilterEnvelopeGenerator from '../FX/FilterEnvelopeGenerator';

class Filter {
  constructor(audioContext, settings) {

    this.filter = audioContext.createBiquadFilter();
    this.input = this.filter;
    this.output = this.filter;
    this.frequency = settings.cutoffFrequency;
    this.filterEnvelopeGenerator = new FilterEnvelopeGenerator(config.fx.filter);
    this.filterEnvelopeGenerator.connect(this.filter.frequency);
    this.filterEnvelopeGenerator.attack = settings.attack;
    this.filterEnvelopeGenerator.release = settings.release;
    this._frequency = this.filter.frequency;
    this.disabled = false;
  }

  set q(value) {
    this.filter.Q.value = value;
  }

  set cutoffFrequency(value) {
    this.filter.frequency.value = value;
  }

  set attack(value) {
    this.filterEnvelopeGenerator.attack = value;
  }

  get attack() {
    return this.filterEnvelopeGenerator.attack;
  }

  set release(value) {
    this.filterEnvelopeGenerator.release = value;
  }

  get release() {
    return this.filterEnvelopeGenerator.release;
  }

  set frequency(value) {
    this._frequency = value;
  }

  get frequency() {
    return this.filter.frequency;
  }

  trigger() {
    if (this.attack > 0) {
      this.filterEnvelopeGenerator.trigger(this._frequency);
    } else {
      this.filter.frequency.value = this._frequency;
    }
  }

  connect(node) {
    if (node.hasOwnProperty('input')) {
      this.output.connect(node.input);
    } else {
      this.output.connect(node);
    }
  }
}

export default Filter;
