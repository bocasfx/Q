import React from 'react';
import './MidiNodeButton.css';
import { connect } from 'react-redux';
import Button from './Button';

class MidiNodeButton extends React.Component {
  render() {
    let style = {};

    if (this.props.devices.midiNodes) {
      style = {
        opacity: 1
      };
    }

    return (
      <Button device="midiNodes">
        <div className="button-item midi-node-button-container" style={style}></div>
      </Button>
    );
  }
}

const matchStateToProps = (state) => {
  return {
    devices: state.Devices
  };
};

module.exports = connect(matchStateToProps)(MidiNodeButton);
