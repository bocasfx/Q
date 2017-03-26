import React from 'react';
import ReactDOM from 'react-dom';
import Canvas from './components/Canvas';
import './index.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import Menu from './components/Menu';
import Settings from './components/Settings';
import NodeSettings from './components/NodeSettings';

const store = createStore(reducer);
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const renderDom = (midiContext) => {
  ReactDOM.render(
      <Provider store={store}>
        <div>
          <div className="settings">
            <Settings/>
            <NodeSettings/>
          </div>
          <Canvas audioContext={audioContext} midiContext={midiContext}/>
          <Menu midi={midiContext !== null}/>
        </div>
      </Provider>,
      document.getElementById('root')
    );
};

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
