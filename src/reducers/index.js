import { combineReducers } from 'redux';
import Devices from './Devices';
import Nodes from './Nodes';
import Streams from './Streams';

export default combineReducers({
  Devices,
  Nodes,
  Streams
});
