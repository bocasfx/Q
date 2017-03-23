import React from 'react';
import './SettingsButton.css';
import { connect } from 'react-redux';
import Button from './Button';

class SettingsButton extends React.Component {
  render() {
    let style = {};

    if (this.props.devices.settings) {
      style = {
        opacity: 1
      };
    }

    return (
      <Button device="settings">
        <div className="button-item settings-button-container" style={style}></div>
      </Button>
    );
  }
}

const matchStateToProps = (state) => {
  return {
    devices: state.Devices
  };
};

const matchDispatchToProps = () => {
  return {

  };
};

module.exports = connect(matchStateToProps, matchDispatchToProps)(SettingsButton);
