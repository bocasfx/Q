import React from 'react';
import Canvas from '../Canvas/Canvas';
import Menu from '../Menu/Menu';
import ControlPanel from '../ControlPanel/ControlPanel';
import FXPanel from '../FXPanel/FXPanel';
import Transport from '../Transport/Transport';
import Visualizer from '../Visualizer/Visualizer';

const App = () => (
  <div>
    <Visualizer/>
    <div className="main-container">
      <Transport/>
      <div className="main-body-container">
        <Menu/>
        <div>
          <Canvas/>
          <FXPanel/>
        </div>
        <ControlPanel/>
      </div>
    </div>
  </div>
);

export default App;