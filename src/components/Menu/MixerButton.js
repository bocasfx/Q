import React from 'react';
import './MixerButton.css';
import { connect } from 'react-redux';
import Button from './Button';

class MixerButton extends React.Component {
  render() {
    let style = {};

    if (this.props.devices.mixer) {
      style = {
        opacity: 1
      };
    }

    return (
      <Button device="mixer">
        <div className="button-item mixer-button-container" style={style}></div>
      </Button>
    );
  }
}

const matchStateToProps = (state) => {
  return {
    devices: state.Devices
  };
};

module.exports = connect(matchStateToProps)(MixerButton);
