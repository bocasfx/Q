import { buffer2ArrayBuffer } from '../../utils/utils';

let fs = null;
let path = null;
let remote = null;

if (window.require) {
  fs = window.require('fs');
  path = window.require('path');
  remote = window.require('electron').remote;
}

class Reverb {
  constructor(audioContext, settings) {

    this.audioContext = audioContext;

    this.convolver = audioContext.createConvolver();
    this.gain = audioContext.createGain();

    this.output = this.convolver;
    this.input = this.gain;
    this.gain.gain.value = settings.amount;

    this.loadImpulseResponse(settings.impulseResponses[0].url);

    this.gain.connect(this.convolver);
    this._impulseResponse = settings.impulseResponses[0].url;
  }

  set amount(value) {
    this.gain.gain.value = value;
  }

  get amount() {
    return this.gain.gain.value;
  }

  set impulseResponse(value) {
    this.loadImpulseResponse(value);
  }

  get impulseResponse() {
    return this._impulseResponse;
  }

  loadImpulseResponse(url) {
    if (!url || url === this._impulseResponse || !window.require) {
      return;
    }

    let filePath = path.join(remote.app.getAppPath(), 'public', url );

    fs.readFile(filePath, (err, dataBuffer) => {
      if (err) {
        alert('Unable to load impulse response.\n\n' + err.message);
        return;
      }
      let arrayBuffer = buffer2ArrayBuffer(dataBuffer);
      this.audioContext.decodeAudioData(arrayBuffer, (buffer) => {
        this.convolver.buffer = buffer;
        this._impulseResponse = url;
      }, (error) => {
        alert('Error with decoding audio data: ' + error);
      });
    });
  }

  connect(node) {
    if (node.hasOwnProperty('input')) {
      this.output.connect(node.input);
    } else {
      this.output.connect(node);
    }
  }
}

module.exports = Reverb;
