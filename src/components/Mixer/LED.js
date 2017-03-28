import React from 'react';
import './LED.css';

class LED extends React.Component {
  render() {
    let style = {};

    if (!this.props.on) {
      style = {
        opacity: 0.3
      };
    }
    return (
      <div className="led-container" style={style}></div>
    );
  }
}

module.exports = LED;
