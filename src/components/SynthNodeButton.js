import React from 'react';
import './SynthNodeButton.css';
import { connect } from 'react-redux';
import Button from './Button';

class NodeButton extends React.Component {
  render() {
    let style = {};

    if (this.props.devices.synthNodes) {
      style = {
        opacity: 1
      };
    }

    return (
      <Button device="synthNodes">
        <div className="button-item node-button-container" style={style}></div>
      </Button>
    );
  }
}

const matchStateToProps = (state) => {
  return {
    devices: state.Devices
  };
};

module.exports = connect(matchStateToProps)(NodeButton);
