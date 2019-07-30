
class MIDIContext {
  constructor() {
    this.context = null;
    this.outputs = null;
  }

  initialize() {
    if (this.context) {
      return Promise.resolve();
    }

    if (!navigator.requestMIDIAccess) {
      return Promise.reject('MIDIAccess is not supported.');
    }

    this.context = navigator.requestMIDIAccess({sysex: true});
    return this.context.then((ctx) => {
      let newOutputs = [];
      for (let output of ctx.outputs.values()) {
        newOutputs.push(output);
      }
      this.outputs = newOutputs;
    });
  }
}

export default (new MIDIContext());
