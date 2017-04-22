import { combineReducers } from 'redux';
import Devices from './Devices';
import Nodes from './Nodes';
import Streams from './Streams';
import Selection from './Selection';
import initialState from '../config/initial-state';
import { hydrate } from '../utils/serializer';

const reducers = combineReducers({
  Devices,
  Nodes,
  Streams,
  Selection
});

const mainReducer = (state = initialState, action) => {
  return action.type === 'HYDRATE_STATE' ? hydrate(action.payload) : reducers(state, action);
};

export default mainReducer;