import Node from './Node';
import midiContext from '../../config/context/MIDIContext';

class MidiNode extends Node {

  constructor(position) {
    super(position);

    this.type = 'midi';
    this.note = 0;
    this.velocity = 127;

    this.nodeImg = new Image();
    this.nodeImg.src = './icons/elements/midi-node.png';

    this.activeNodeImg = new Image();
    this.activeNodeImg.src = './icons/elements/midi-node-active.png';

    this.probabilityNodeImg = new Image();
    this.probabilityNodeImg.src = './icons/elements/midi-node-probability.png';

    this.midiOut = midiContext.outputs.values().next().value;
  }

  play() {
    if (this.active || !this.midiOut || !this.shouldPlay) {
      return;
    }
    this.active = true;
    this.midiOut.send([0x92, this.note, this.velocity]);
  }

  stop() {
    if (!this.active) {
      return;
    }
    this.active = false;
    this.midiOut.send([0x82, this.note, this.velocity]);
  }
}

export default MidiNode;
