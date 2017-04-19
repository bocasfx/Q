import names from '../config/names';
import uuidv1 from 'uuid/v1';
import _ from 'lodash';

class Node {

  constructor(position) {
    this.position = position;
    this.id = uuidv1();
    this.name = names.generate();
    this.selected = false;
    this.active = false;
    this.particleQueue = [];
    this.volume = 0.8;
    this.disabled = false;
    this.pan = 0;

    this.selectedNodeImg = new Image();
    this.selectedNodeImg.src = './icons/elements/node-selected.png';

    this.disabledNodeImg = new Image();
    this.disabledNodeImg.src = './icons/elements/disabled-node.png';
  }

  set osc1Freq(frequency) {}
  set osc2Freq(frequency) {}
  set osc1WaveType(waveType) {}
  set osc2WaveType(waveType) {}
  set src(value) {}
  get src() {}
  set attack(value) {}
  get attack() {}
  set release(value) {}
  get release() {}

  stop() {}

  isParticleQueued(id) {
    let particleIdx = _.findIndex(this.particleQueue, (particleId) => {
      return particleId === id;
    });
    return particleIdx >= 0;
  }

  enqueueParticle(id) {
    if (this.disabled) {
      return;
    }

    if (!this.particleQueue.length) {
      this.play();
    }
    this.particleQueue.push(id);
  }

  dequeueParticle(id) {
    _.remove(this.particleQueue, (particleId) => {
      return particleId === id;
    });

    if (!this.particleQueue.length) {
      this.stop();
    }
  }

  render(canvasContext) {

    let image;

    if (this.disabled) {
      image = this.disabledNodeImg;
    } else {
      image = this.active ? this.activeNodeImg : this.nodeImg;
    }
    canvasContext.drawImage(image, this.position[0] - 20, this.position[1] - 20);

    if (this.selected) {
      canvasContext.drawImage(this.selectedNodeImg, this.position[0] - 20, this.position[1] - 20);
    }
  }
}

module.exports = Node;