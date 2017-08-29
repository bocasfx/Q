import React from 'react';
import './FXPanel.css';
import DelayPanel from './DelayPanel';
import FilterPanel from './FilterPanel';

class FXPanel extends React.Component {
  render() {
    return (
      <div className="fx-panel-container">
        <DelayPanel/>
        <FilterPanel/>
      </div>
    );
  }
}

export default FXPanel;
