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
import midiContext from './config/context/MIDIContext';
import EventHandler from './app/EventHandler';

const store = createStore(reducer);

const renderDom = () => {
  ReactDOM.render(
    <Provider store={store}>
      <div>
        <Toaster/>
        <Mixer/>
        <div className="main-container">
          <Menu/>
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

const initialize = () => {
  let eventHandler = new EventHandler(store);
  eventHandler.initialize();
  midiContext.initialize(store)
    .then(() => {

      renderDom();

      if (localStorage.QState) {
        let payload = JSON.parse(localStorage.QState);
        if (payload.nodes) {
          store.dispatch({
            type: 'HYDRATE_NODES',
            payload: payload.nodes
          });
        }
        if (payload.streams) {
          store.dispatch({
            type: 'HYDRATE_STREAMS',
            payload: payload.streams
          });
        }
        if (payload.fx) {
          store.dispatch({
            type: 'HYDRATE_FX',
            payload: payload.fx
          });
        }
      }

      for (let entry of midiContext.outputs.entries()) {
        for (let destination of entry) {
          if (destination.state && destination.state === 'connected' && destination.name) {
            store.dispatch({
              type: 'ADD_DESTINATION',
              destination
            });
          }
        }
      }
    }
  );
};

initialize();
