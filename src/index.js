import React from 'react';
import { render } from 'react-dom';
import store from './app/Store';
import './index.css';
import midiContext from './app/context/MIDIContext';
import eventHandler from './app/EventHandler';
import hydrator from './app/Hydrator';
import { HashRouter } from 'react-router-dom';
import App from './App';

const renderDom = () => {
  render((
    <HashRouter>
      <App />
    </HashRouter>
  ), document.getElementById('root'));
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
        console.log(entry);
        for (let destination of entry) {
          if (destination.state && destination.state === 'connected' && destination.name) {
            console.log(destination.name)
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
