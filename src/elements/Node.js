import names from '../config/names';

class Node {

  constructor() {
    this.name = names.generate();
    this.selected = false;
  }

  set osc1Freq(frequency) {}
  get osc1Freq() {}
  set src(value) {}
  get src() {}
  set volume(value) {}
  get volume() {}
}

module.exports = Node;