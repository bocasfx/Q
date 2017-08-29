import React from 'react';
import './FXPanel.css';
import DelayPanel from './DelayPanel';
import WaveShaperPanel from './WaveShaperPanel';
import FilterPanel from './FilterPanel';

class FXPanel extends React.Component {
  render() {
    return (
      <div className="fx-panel-main-container">
        <DelayPanel/>
        <WaveShaperPanel/>
        <FilterPanel/>
      </div>
    );
  }
}

export default FXPanel;
