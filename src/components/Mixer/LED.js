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

    let ledClass = 'led-' + this.props.type + ' led-container';
    return (
      <div className={ledClass} style={style}></div>
    );
  }
}

export default LED;
