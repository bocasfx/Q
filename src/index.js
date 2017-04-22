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

const store = createStore(reducer);

const renderDom = (midiContext) => {
  ReactDOM.render(
    <Provider store={store}>
      <div>
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
      const state = store.getState();
      console.log(state.Nodes[0]);
      console.log(JSON.stringify(state.Nodes[0]));
      localStorage.QState = JSON.stringify(state);
    }
  };

  // if (localStorage.QState) {
  //   store.dispatch({
  //     type: 'HYDRATE_STATE',
  //     payload: JSON.parse(localStorage.QState)
  //   });
  // }
};

initialize();
