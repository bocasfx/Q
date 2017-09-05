import axios from 'axios';

class Reverb {
  constructor(audioContext, settings) {

    this.audioContext = audioContext;

    this.convolver = audioContext.createConvolver();
    this.gain = audioContext.createGain();

    this.output = this.convolver;
    this.input = this.gain;
    this.gain.gain.value = settings.amount;

    this.loadImpulseResponse(settings.urls[0]);

    this.gain.connect(this.convolver);
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
    return null;
  }

  loadImpulseResponse(url) {
    console.log(url);
    if (!url) {
      return;
    }
    axios({
      method: 'get',
      url,
      responseType: 'arraybuffer'
    }).then((response) => {
      console.log('done');
      // this.convolver = this.audioContext.createConvolver();
      // this.output = this.convolver;
      // this.gain.connect(this.convolver);
      this.audioContext.decodeAudioData(response.data, (buffer) => {
        this.convolver.buffer = buffer;
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
