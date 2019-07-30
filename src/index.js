import React from 'react';
import { render } from 'react-dom';
import store from './app/Store';
import './index.css';
import midiContext from './app/context/MIDIContext';
import eventHandler from './app/EventHandler';
import hydrator from './app/Hydrator';
import App from './App';

const renderDom = () => {
  render(
    <App />,
    document.getElementById('root')
  );
};

const renderError = () => {
  render(
    <div className="unsupported-browser">errr... Use Chrome?</div>,
    document.getElementById('root')
  );
};

const initialize = () => {
  eventHandler.initialize();
  midiContext
    .initialize()
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
              destination,
            });
          }
        }
      }
    })
    .catch(() => {
      renderError();
    });
};

initialize();
