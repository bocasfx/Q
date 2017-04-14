import Node from './Node';

class MidiNode extends Node {

  constructor(position, midiContext) {
    super(position);
    this.midiContext = midiContext;
    let outputs = midiContext.outputs;
    let output = outputs.values().next();
    this.midiOut = output.value;
    this.type = 'midi';
    this.note = 30;
    this.velocity = 127;

    this.nodeImg = new Image();
    this.nodeImg.src = './icons/elements/midi-node.png';

    this.activeNodeImg = new Image();
    this.activeNodeImg.src = './icons/elements/midi-node-active.png';
  }

  play() {
    if (this.active) {
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
