import React from 'react';
import './Knob.css';

class Knob extends React.Component {
  render() {
    return (
      <div className="knob-container">
        <div className="knob-label">Label</div>
        <div className="knob-outer">
          <div className="knob-dial">0</div>
        </div>
      </div>
    );
  }
}

module.exports = Knob;
