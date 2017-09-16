import { combineReducers } from 'redux';
import devices from './Devices';
import nodes from './Nodes';
import streams from './Streams';
import selection from './Selection';
import notifications from './Notifications';
import fx from './FX';
import transport from './Transport';
import midi from './MIDI';
import app from './App';
import initialState from '../config/initial-state';

const reducers = combineReducers({
  devices,
  nodes,
  streams,
  selection,
  notifications,
  fx,
  transport,
  midi,
  app
});

const mainReducer = (state = initialState, action) => {
  return reducers(state, action);
};

export default mainReducer;