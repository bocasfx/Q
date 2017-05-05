import uuidv1 from 'uuid/v1';
import names from '../config/names';
import config from '../config/config';

class Stream {
  constructor() {
    this.id = uuidv1();
    this.name = names.generate();
    this.disabled = false;
    this.type = 'stream';
    this.mouseDown = false;
    this.particles = [];
    this.speed = 1.0;
    this.selected = false;
    this.count = config.particle.count;
  }
}

module.exports = Stream;