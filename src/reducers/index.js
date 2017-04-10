import { combineReducers } from 'redux';
import Devices from './Devices';
import Nodes from './Nodes';
import Streams from './Streams';
import Selection from './Selection';

export default combineReducers({
  Devices,
  Nodes,
  Streams,
  Selection
});
