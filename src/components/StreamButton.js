import React from 'react';
import './StreamButton.css';
import { connect } from 'react-redux';
import Button from './Button';

class StreamButton extends React.Component {
  render() {
    let style = {};

    if (this.props.devices.streams) {
      style = {
        opacity: 1
      };
    }

    return (
      <Button device="streams">
        <div className="button-item stream-button-container" style={style}></div>
      </Button>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    devices: state.Devices
  };
};

module.exports = connect(mapStateToProps)(StreamButton);
