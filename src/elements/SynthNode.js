import config from '../config/config';
import Node from './Node';
import Oscillator from './Oscillator';
import Amplifier from './Amplifier';
import EnvelopeGenerator from './EnvelopeGenerator';

class SynthNode extends Node {

  constructor(position, audioContext) {
    super();
    this.position = position;
    this.active = false;

    this.oscillator1 = new Oscillator(audioContext);
    this.oscillator2 = new Oscillator(audioContext);
    this.amplifier = new Amplifier(audioContext);

    this.envelopeGenerator = new EnvelopeGenerator(config.synthNode.envelope, audioContext);

    this.oscillator1.connect(this.amplifier);
    this.oscillator2.connect(this.amplifier);
    this.envelopeGenerator.connect(this.amplifier.amplitude);
    this.amplifier.connect(audioContext.destination);

    this.type = 'synth';
    this.sustain = config.synthNode.sustain;

    this.nodeImg = new Image();
    this.nodeImg.src = '/icons/nodes/node.png';

    this.activeNodeImg = new Image();
    this.activeNodeImg.src = '/icons/nodes/node-active.png';

    this.selectedNodeImg = new Image();
    this.selectedNodeImg.src = '/icons/nodes/node-selected.png';
  }

  set osc1Freq(freq) {
    this.oscillator1.frequency = freq;
  }

  set osc2Freq(freq) {
    this.oscillator2.frequency = freq;
  }

  set osc1WaveType(waveType) {
    this.oscillator1.waveType = waveType;
  }

  set osc2WaveType(waveType) {
    this.oscillator2.waveType = waveType;
  }

  set attack(value) {
    this.envelopeGenerator.attack = value;
  }

  set release(value) {
    this.envelopeGenerator.release = value;
  }

  play() {
    if (this.active) {
      return;
    }
    this.active = true;
    this.envelopeGenerator.trigger(this.volume);
  }

  stop() {
    if (!this.active) {
      return;
    }
    this.active = false;
    this.envelopeGenerator.close();
  }

  render(canvasContext) {

    let image = this.active ? this.activeNodeImg : this.nodeImg;
    canvasContext.drawImage(image, this.position[0] - 20, this.position[1] - 20);

    if (this.selected) {
      canvasContext.drawImage(this.selectedNodeImg, this.position[0] - 20, this.position[1] - 20);
    }
  }
}

export default SynthNode;