import React from 'react';
import './FXPanel.css';
import DelayPanel from './DelayPanel';
import WaveShaperPanel from './WaveShaperPanel';
import FilterPanel from './FilterPanel';
import ReverbPanel from './ReverbPanel';
import config from '../../config/config';

class FXPanel extends React.Component {
  render() {
    let style = {
      width: window.innerWidth - config.controlPanel.width - config.menu.width
    };
    return (
      <div className="fx-panel-main-container" style={style}>
        <WaveShaperPanel/>
        <DelayPanel/>
        <FilterPanel/>
        <ReverbPanel/>
      </div>
    );
  }
}

export default FXPanel;
