import { combineReducers } from 'redux';
import devices from './Devices';
import nodes from './Nodes';
import streams from './Streams';
import selection from './Selection';
import notifications from './Notifications';
import initialState from '../config/initial-state';
import { hydrate } from '../utils/serializer';

const reducers = combineReducers({
  devices,
  nodes,
  streams,
  selection,
  notifications
});

const mainReducer = (state = initialState, action) => {
  return action.type === 'HYDRATE_STATE' ? hydrate(action.payload) : reducers(state, action);
};

export default mainReducer;