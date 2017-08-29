import React from 'react';
import ReactDOM from 'react-dom';
import Canvas from './components/Canvas';
import './index.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import Menu from './components/Menu/Menu';
import Mixer from './components/Mixer/Mixer';
import ControlPanel from './components/ControlPanel/ControlPanel';
import FXPanel from './components/FXPanel/FXPanel';
import Toaster from './components/UI/Toaster';
import { serialize } from './utils/serializer';

let electron = null;
let dialog = null;
let fs = null;

if (window.require) {
  electron = window.require('electron');
  fs = window.require('fs');
  dialog = electron.remote.dialog;
}

const store = createStore(reducer);
const filters = {
    filters: [{
      name: 'text',
      extensions: ['q']
    }]
  };

const renderDom = (midiContext) => {
  ReactDOM.render(
    <Provider store={store}>
      <div>
        <Toaster/>
        <Mixer/>
        <div className="main-container">
          <Menu midi={midiContext !== null}/>
          <div>
            <Canvas midiContext={midiContext}/>
            <FXPanel/>
          </div>
          <ControlPanel/>
        </div>
      </div>
    </Provider>,
    document.getElementById('root')
  );
};

const saveContent = (type, fileName) => {
  if (type === 'file') {
    if (fileName === undefined) {
      return;
    }

    fs.writeFile(fileName, serialize(store.getState()), (err) => {
      if (err) {
        // TODO: Show notification
        console.log(err);
        return;
      }
    });
  }

  const state = store.getState();
  localStorage.QState = serialize(state);
};

const loadContent = (type, fileName) => {
  if (type === 'file') {
    if (fileName === undefined) {
      return;
    }

    fs.readFile(fileName, 'utf-8', (err, data) => {
      if (err) {
        // TODO: Show notification
        console.log(err);
        return;
      }

      store.dispatch({
        type: 'HYDRATE_STATE',
        payload: JSON.parse(data)
      });
    });
  }

  store.dispatch({
    type: 'HYDRATE_STATE',
    payload: JSON.parse(localStorage.QState)
  });
};

const serializeProject = () => {
  if (!dialog) {
    saveContent();
    return;
  }

  dialog.showSaveDialog(filters, (fileName) => {
    saveContent('file', fileName);
  });
};

const hydrateProject = () => {
  if (!dialog) {
    loadContent();
    return;
  }

  dialog.showOpenDialog(filters, (fileNames) => {
    loadContent('file', fileNames[0]);
  });
};

const toggleDevice = (device) => {
  store.dispatch({
    type: 'TOGGLE_DEVICE',
    device
  });
};

const initialize = () => {
  if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({sysex: false})
      .then((midiContext) => {
        renderDom(midiContext);
      }, () => {
        renderDom(null);
      });
  } else {
    renderDom(null);
  }

  window.onkeypress = (event) => {
    if (event.ctrlKey) {

      switch (event.key) {

        // Save
        case 's':
        case 'S':
          return serializeProject();

        // Open
        case 'o':
        case 'O':
          return hydrateProject();

        // Mixer
        case 'm':
        case 'M':
          return toggleDevice('mixer');

        // Grab
        case 'g':
        case 'G':
          return toggleDevice('grab');

        default:
          return null;
      }
    } else {

      switch (event.key) {
        //Play/Pause
        case ' ':
          store.dispatch({
            type: 'TOGGLE_TRANSPORT'
          });
          if (!store.getState().transport.playing) {
            store.dispatch({
              type: 'STOP_NODES'
            });
          }
          return; 

        default:
          return null;
      }
    }
  };

  window.onresize = () => {
    saveContent();
    location.reload();
  };

  if (localStorage.QState) {
    store.dispatch({
      type: 'HYDRATE_STATE',
      payload: JSON.parse(localStorage.QState)
    });
  }
};

initialize();
