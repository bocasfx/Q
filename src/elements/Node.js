import names from '../config/names';
import uuidv1 from 'uuid/v1';

class Node {

  constructor() {
    this.id = uuidv1();
    this.name = names.generate();
    this.selected = false;
    this.volume = 1.0;
  }

  set osc1Freq(frequency) {}
  set osc2Freq(frequency) {}
  set osc1WaveType(waveType) {}
  set osc2WaveType(waveType) {}
  set src(value) {}
  get src() {}
  set volume(value) {}
  get volume() {}
}

module.exports = Node;