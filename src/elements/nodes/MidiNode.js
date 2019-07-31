import Node from './Node';
import midiContext from '../../app/MIDIContext';

class MidiNode extends Node {

  constructor(position) {
    super(position);

    this.type = 'midi';
    this.note = 24;
    this.velocity = 127;
    this.channel = 0;
    this.octave = 0;

    this.nodeImg = new Image();
    this.nodeImg.src = './icons/elements/midi-node.png';

    this.activeNodeImg = new Image();
    this.activeNodeImg.src = './icons/elements/midi-node-active.png';

    this.probabilityNodeImg = new Image();
    this.probabilityNodeImg.src = './icons/elements/midi-node-probability.png';

    this.midiOut = midiContext.outputs[0];
  }

  play() {
    if (this.active || !this.midiOut || !this.shouldPlay) {
      return;
    }
    this.active = true;
    let command = 144 + this.channel;
    this.midiOut.send(['0x' + command.toString(16), this.note, this.velocity]);
  }

  stop() {
    if (!this.active) {
      return;
    }
    this.active = false;
    let command = 128 + this.channel;
    this.midiOut.send(['0x' + command.toString(16), this.note, this.velocity]);
  }
}

export default MidiNode;
