import uuidv1 from 'uuid/v1';
import names from '../config/names';
import config from '../config/config';
import Particle from './Particle';

class Stream {
  constructor({position, speed = 1.0, count = 1}) {
    this.position = position;
    this.id = uuidv1();
    this.name = names.generate();
    this.disabled = false;
    this.type = 'stream';
    this.mouseDown = false;
    this.particles = [];
    this.speed = speed;
    this.selected = false;
    this.angles = [];
    this.count = count || config.particle.count;
  }

  set count(value) {
    this.particles = [];
    for (let i = 0; i < value; i++) {
      this.particles.push(new Particle(this.position));
    }
    this.space = this.distance / this.particles.length;
  }

  get count() {
    return this.particles.length;
  }
}

module.exports = Stream;