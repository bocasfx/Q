import config from '../config/config';
import Node from './Node';

class MidiNode extends Node {

  constructor(position, midiContext) {
    super();
    this.position = position;
    this.midiContext = midiContext;
    this.sustain = config.midiNode.sustain;
    this.active = false;
    let outputs = midiContext.outputs;
    let output = outputs.values().next();
    this.midiOut = output.value;
    this.type = 'midi';
    this.note = 30;
    this.velocity = 127;
    this.selected = false;
  }

  play() {
    if (this.active) {
      return;
    }
    this.active = true;
    this.midiOut.send([0x92, this.note, this.velocity]);
    setTimeout(() => {
      this.active = false;
      this.midiOut.send([0x82, this.note, this.velocity]);
    }, this.sustain);
  }

  render(canvasContext) {
    let extraRadius = this.active ? 2 : 0;

    canvasContext.beginPath();
    canvasContext.arc(this.position[0] + 3, this.position[1] + 3, config.midiNode.radius + extraRadius, 0, 2 * Math.PI, false);
    canvasContext.fillStyle = config.midiNode.shadow;
    canvasContext.fill();

    canvasContext.beginPath();
    canvasContext.arc(this.position[0], this.position[1], config.midiNode.radius + extraRadius, 0, 2 * Math.PI, false);
    canvasContext.strokeStyle = config.midiNode.strokeStyle;
    canvasContext.lineWidth = config.midiNode.lineWidth;
    canvasContext.setLineDash(config.midiNode.lineDash);
    canvasContext.fillStyle = config.midiNode.fillStyle;
    canvasContext.fill();
    canvasContext.stroke();

    if (this.selected) {
      canvasContext.beginPath();
      canvasContext.arc(this.position[0], this.position[1], config.selectedNode.radius, 0, 2 * Math.PI, false);
      canvasContext.strokeStyle = config.selectedNode.strokeStyle;
      canvasContext.lineWidth = config.selectedNode.lineWidth;
      canvasContext.setLineDash(config.selectedNode.lineDash);
      canvasContext.stroke();
    }
  }
}

export default MidiNode;
