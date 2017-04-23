import names from '../config/names';
import uuidv1 from 'uuid/v1';
import _ from 'lodash';

class Node {

  constructor(position) {
    this.position = position;
    this.id = uuidv1();
    this.name = names.generate(true);
    this.selected = false;
    this.active = false;
    this.particleQueue = [];
    this.volume = 0.8;
    this.disabled = false;
    this.pan = 0;
    this.links = [];
    this.linkDelay = 500;

    this.selectedNodeImg = new Image();
    this.selectedNodeImg.src = './icons/elements/node-selected.png';

    this.disabledNodeImg = new Image();
    this.disabledNodeImg.src = './icons/elements/disabled-node.png';
  }

  set osc1Freq(frequency) {}
  set osc2Freq(frequency) {}
  get osc1Freq() {}
  get osc2Freq() {}
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

    // Trigger the node if it's the
    // first particle to enter the queue.
    if (!this.particleQueue.length) {
      this.play();
    }
    this.particleQueue.push(id);
  }

  dequeueParticle(id) {
    _.remove(this.particleQueue, (particleId) => {
      return particleId === id;
    });

    // Stop the node only if it's the
    // last particle to leave the queue
    if (!this.particleQueue.length) {
      this.stop();
    }
  }

  link(destNode) {
    this.links.push(destNode);
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