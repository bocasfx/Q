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
import Toaster from './components/UI/Toaster';
import { serialize } from './utils/serializer';

let electron = null;
let dialog = null;
let fs = null;

if (window.require) {
  electron = window.require('electron');
  fs = window.require('fs-extra');
  dialog = electron.remote.dialog;
}

const store = createStore(reducer);

const renderDom = (midiContext) => {
  ReactDOM.render(
    <Provider store={store}>
      <div>
        <Toaster/>
        <Mixer/>
        <div className="main-container">
          <Menu midi={midiContext !== null}/>
          <Canvas midiContext={midiContext}/>
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
      }
    });
  }

  const state = store.getState();
  localStorage.QState = serialize(state);
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
    if (event.ctrlKey && event.key ==='s') {

      if (!dialog) {
        saveContent();
        return;
      }

      dialog.showSaveDialog((fileName) => {
        saveContent('file', fileName);
      });
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
