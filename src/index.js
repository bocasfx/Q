import React from 'react';
import ReactDOM from 'react-dom';
import Canvas from './components/Canvas';
import './index.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import Menu from './components/Menu';
import Settings from './components/Settings';

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <div className="grid">
      <div className="settings">
        <Settings/>
      </div>
      <Canvas/>
      <Menu/>
    </div>
  </Provider>,
  document.getElementById('root')
);
