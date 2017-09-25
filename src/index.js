import React from 'react';
import ReactDOM from 'react-dom';
import store from './app/Store';
import Canvas from './components/Canvas/Canvas';
import './index.css';
import { Provider } from 'react-redux';
import Menu from './components/Menu/Menu';
// import Mixer from './components/Mixer/Mixer';
import ControlPanel from './components/ControlPanel/ControlPanel';
import FXPanel from './components/FXPanel/FXPanel';
import Transport from './components/Transport/Transport';
import midiContext from './app/context/MIDIContext';
import eventHandler from './app/EventHandler';
import hydrator from './app/Hydrator';

const renderDom = () => {
  ReactDOM.render(
    <Provider store={store}>
      <div>
        {/*<Mixer/>*/}
        <div className="main-container">
          <Transport/>
          <div className="main-body-container">
            <Menu/>
            <div>
              <Canvas/>
              <FXPanel/>
            </div>
            <ControlPanel/>
          </div>
        </div>
      </div>
    </Provider>,
    document.getElementById('root')
  );
};

const initialize = () => {
  eventHandler.initialize();
  midiContext.initialize()
    .then(() => {

      renderDom();

      if (localStorage.QState) {
        let payload = JSON.parse(localStorage.QState);
        hydrator.hydrate(store, payload);
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
