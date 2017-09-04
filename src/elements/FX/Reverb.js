import axios from 'axios';

class Reverb {
  constructor(audioContext, settings) {

    this.convolver = audioContext.createConvolver();
    this.gain = audioContext.createGain();

    this.output = this.convolver;
    this.input = this.gain;
    this.gain.gain.value = settings.amount;

    axios({
      method: 'get',
      url: settings.urls[0],
      responseType: 'arraybuffer'
    }).then((response) => {
      let audioData = response.data;
      audioContext.decodeAudioData(audioData, (buffer) => {
        this.convolver.buffer = buffer;
      }, (error) => {
        console.log('Error with decoding audio data: ' + error);
      });
    })
    .catch(function (error) {
      console.log('Unable to load impulse response: ', error);
    });

    this.gain.connect(this.convolver);
  }

  set amount(value) {
    this.gain.gain.value = value;
  }

  get amount() {
    return this.gain.gain.value;
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
