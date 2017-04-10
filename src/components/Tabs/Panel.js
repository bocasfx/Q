import React from 'react';
import './Panel.css';

class Panel extends React.Component {
  render() {
    return (
      <div className="panel-container">
        <div className="panel-list">
          {this.props.children}
        </div>
      </div>
    );
  }
}

module.exports = Panel;
