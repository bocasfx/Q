import audioContext from '../../app/context/AudioContext';

class Pan {
  constructor() {
    this.pan = 0;
    this.panner = audioContext.createPanner();
    this.input = this.panner;
    this.output = this.panner;
  }

  set value(pan) {
    this.pan = pan;

    var xDeg = pan;
    var zDeg = xDeg + 90;
    if (zDeg > 90) {
      zDeg = 180 - zDeg;
    }
    var x = Math.sin(xDeg * (Math.PI / 180));
    var z = Math.sin(zDeg * (Math.PI / 180));
    console.log(pan, x, z);

    this.panner.setPosition(x, 0, z);
  }

  get value() {
    return this.pan;
  }

  connect(node) {
    if (node.hasOwnProperty('input')) {
      this.output.connect(node.input);
    } else {
      this.output.connect(node);
    };
  }

  disconnect() {
    this.splitter.disconnect();
    this.gainL.disconnect();
    this.gainR.disconnect();
    this.output.disconnect();
  }
}

export default Pan;
