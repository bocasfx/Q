import React from 'react';
import './Panel.css';

class Panel extends React.Component {
  render() {
    return (
      <div className="panel-container">
        {this.props.children}
      </div>
    );
  }
}

module.exports = Panel;
