
class MIDIContext {
  constructor() {
    this.context = null;
    this.outputs = null;
  }

  initialize() {
    if (navigator.requestMIDIAccess) {
      this.context = navigator.requestMIDIAccess({sysex: false});
      return this.context.then((ctx) => {
        this.outputs = ctx.outputs;
      });
    }
  }
}

export default (new MIDIContext());
