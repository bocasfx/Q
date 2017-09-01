import React from 'react';
import './FXPanel.css';
import DelayPanel from './DelayPanel';
import WaveShaperPanel from './WaveShaperPanel';
import FilterPanel from './FilterPanel';
import ReverbPanel from './ReverbPanel';

class FXPanel extends React.Component {
  render() {
    return (
      <div className="fx-panel-main-container">
        <DelayPanel/>
        <WaveShaperPanel/>
        <FilterPanel/>
        <ReverbPanel/>
      </div>
    );
  }
}

export default FXPanel;
