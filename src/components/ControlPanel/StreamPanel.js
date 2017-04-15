import React from 'react';
import './StreamPanel.css';

class StreamPanel extends React.Component {
  render() {
    return (
      <div className="stream-panel-container">
        <div>
          <div>{this.props.stream.name}</div>
        </div>
      </div>
    );
  }
}

module.exports = StreamPanel;
