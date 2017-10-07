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
    if (window.location.hash === '#/') {
      switch (action.type) {
        case 'ADD_SYNTH_NODE':
        case 'ADD_MIDI_NODE':
        case 'ADD_AUDIO_NODE':
          action.id = uuid();
          ipcRenderer.send('mixerEvents', action);
          break;
        case 'DELETE_NODE':
        case 'DELETE_ALL_NODES':
        case 'DELETE_SELECTED_NODES':
        case 'SELECT_NODE':
        case 'SELECT_ALL_NODES':
        case 'DESELECT_NODES':
        case 'SET_NODE_VOLUME':
        case 'SET_NODE_ATTACK':
        case 'SET_NODE_RELEASE':
        case 'SET_NODE_SEND_GAIN':
        case 'SET_NODE_PROBABILITY':
        case 'SET_NODE_LAG':
        case 'SET_NODE_DISABLED_STATUS':
        case 'TOGGLE_TRANSPORT':
          ipcRenderer.send('mixerEvents', action);
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
        case 'SET_NODE_LAG':
        case 'SET_NODE_DISABLED_STATUS':
        case 'TOGGLE_TRANSPORT':
          ipcRenderer.send('mainEvents', action);
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
