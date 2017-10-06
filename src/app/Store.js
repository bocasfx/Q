import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers';

let electron = null;
let ipcRenderer = null;

if (window.require) {
  electron = window.require('electron');
  ipcRenderer = electron.ipcRenderer;
}

const eventMiddleware = () => next => action => {
  if (action.type === 'ADD_SYNTH_NODE') {
    console.log('hey from middleware');
    if (!action.relay) {
      ipcRenderer.send('MixerEvents', 'Added node');
    }
  }
  next(action);
};

const middleware = applyMiddleware(eventMiddleware);
const store = createStore(reducer, middleware);

export default store;
