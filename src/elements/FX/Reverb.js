import axios from 'axios';

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
    if (!url || url === this._impulseResponse) {
      return;
    }
    axios({
      method: 'get',
      url,
      responseType: 'arraybuffer'
    }).then((response) => {
      this.audioContext.decodeAudioData(response.data, (buffer) => {
        this.convolver.buffer = buffer;
        this._impulseResponse = url;
      }, (error) => {
        console.log('Error with decoding audio data: ' + error);
      });
    })
    .catch(function (error) {
      console.log('Unable to load impulse response: ', error);
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
