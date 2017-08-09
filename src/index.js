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

const saveContent = () => {
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
      saveContent();
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
