import React from 'react';
import './AudioNodeButton.css';
import { connect } from 'react-redux';
import Button from './Button';

class AudioNodeButton extends React.Component {
  render() {
    let style = {};

    if (this.props.devices.audioNodes) {
      style = {
        opacity: 1
      };
    }

    return (
      <Button device="audioNodes">
        <div className="button-item audio-node-button-container" style={style}></div>
      </Button>
    );
  }
}

const matchStateToProps = (state) => {
  return {
    devices: state.Devices
  };
};

module.exports = connect(matchStateToProps)(AudioNodeButton);
