let midiContext = null;

if (navigator.requestMIDIAccess) {
  midiContext = navigator.requestMIDIAccess({sysex: false});
}

export default midiContext;
