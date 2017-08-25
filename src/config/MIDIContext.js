
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
        for (let entry of this.outputs.entries()) {
          for (let item of entry) {
            if (item.state && item.state === 'connected' && item.name) {
              console.log(item.name);
            }
          }
        }
      });
    }
  }
}

export default (new MIDIContext());
