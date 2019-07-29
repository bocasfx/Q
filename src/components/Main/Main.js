import React from 'react';
import Canvas from '../Canvas/Canvas';
import Menu from '../Menu/Menu';
import ControlPanel from '../ControlPanel/ControlPanel';
import Transport from '../Transport/Transport';

const App = () => (
  <div>
    <div className="main-container">
      <Transport/>
      <div className="main-body-container">
        <Menu/>
        <div>
          <Canvas/>
        </div>
        <ControlPanel/>
      </div>
    </div>
  </div>
);

export default App;