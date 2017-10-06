import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers';
import uuid from 'uuid/v1';

let electron = null;
let ipcRenderer = null;

if (window.require) {
  electron = window.require('electron');
  ipcRenderer = electron.ipcRenderer;
}

const eventMiddleware = () => next => action => {
  if (!action.relay) {
    if (window.location.pathname === '/') {
      switch (action.type) {
        case 'ADD_SYNTH_NODE':
        case 'ADD_MIDI_NODE':
        case 'ADD_AUDIO_NODE':
          action.id = uuid();
          ipcRenderer.send('MixerEvents', action);
          break;
        default:
          break;
      }
    } else {
      switch (action.type) {
        case 'SET_NODE_VOLUME':
        case 'SET_NODE_ATTACK':
        case 'SET_NODE_RELEASE':
        case 'SET_NODE_SEND_GAIN':
        case 'SET_NODE_PROBABILITY':
        case 'SET_NODE_DISABLED_STATUS':
          ipcRenderer.send('MainEvents', action);
          break;
        default:
          break;
      }
    }
  }
  next(action);
};

const middleware = applyMiddleware(eventMiddleware);
const store = createStore(reducer, middleware);

export default store;
