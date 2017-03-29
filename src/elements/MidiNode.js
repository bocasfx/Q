import config from '../config/config';
import uuidv1 from 'uuid/v1';

class MidiNode {

  constructor(position, midiContext) {
    this.id = uuidv1();
    this.position = position;
    this.midiContext = midiContext;
    this.sustain = config.midiNode.sustain;
    this.active = false;
    let outputs = midiContext.outputs;
    let output = outputs.values().next();
    this.midiOut = output.value;
    this.type = 'midi';
  }

  play() {
    if (this.active) {
      return;
    }
    this.active = true;
    this.midiOut.send([0x90, 3, 32]);
    setTimeout(() => {
      this.active = false;
      this.midiOut.send([0x90, 3, 0]);
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

  }
}

export default MidiNode;
