import config from '../config/config';
import uuidv1 from 'uuid/v1';

class MidiNode {

  constructor(position, midiContext) {
    this.id = uuidv1();
    this.position = position;
    this.midiContext = midiContext;
    this.sustain = config.midiNode.sustain;
    this.playing = false;
    let outputs = midiContext.outputs;
    let output = outputs.values().next();
    this.midiOut = output.value;
  }

  play() {
    if (this.playing) {
      return;
    }
    this.playing = true;
    this.midiOut.send([0x90, 3, 32]);
    setTimeout(() => {
      this.playing = false;
    }, this.sustain);
  }

  render(canvasContext) {
    let extraRadius = this.playing ? 2 : 0;
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
