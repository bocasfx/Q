import names from '../../config/names';
import uuidv1 from 'uuid/v1';
import _ from 'lodash';

class Node {

  constructor(position) {
    this.position = position;
    this.id = uuidv1();
    this.name = names.generate(true);
    this.selected = false;
    this.activeStatus = false;
    this.particleQueue = [];
    this._disabled = false;
    this.pan = 0;
    this.links = [];
    this.lag = 0;
    this.probability = 1.0;
    this.ignoring = false;
    this.parentIds = [];

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
  set sendFXGain(value) {}
  get sendFXGain() {}
  set noiseGain(value) {}
  get noiseGain() {}
  set osc1Gain(value) {}
  get osc1Gain() {}
  set osc2Gain(value) {}
  get osc2Gain() {}
  set volume(value) {}
  get volume() {}

  set disabled(value) {
    this._disabled = value;
  }

  get disabled() {
    return this._disabled;
  }

  get shouldPlay() {
    let prob = Math.random();
    this.ignoring = prob > this.probability;
    return !this.ignoring;
  }

  stop() {}

  isParticleQueued(id) {
    let particleIdx = _.findIndex(this.particleQueue, (particleId) => {
      return particleId === id;
    });
    return particleIdx >= 0;
  }

  enqueueParticle(id) {
    if (this._disabled) {
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
      this.ignoring = false;
    }
  }

  link(destNodeId) {
    this.links.push(destNodeId);
  }

  unlink(destNodeId) {
    this.links = _.remove(this.links, (link) => {
      return link !== destNodeId;
    });
  }

  render(canvasContext) {

    let image;

    if (this._disabled) {
      image = this.disabledNodeImg;
    } else if (this.ignoring) {
      image = this.probabilityNodeImg;
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