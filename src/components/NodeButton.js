import React from 'react';
import './NodeButton.css';
import { connect } from 'react-redux';
import Button from './Button';

class NodeButton extends React.Component {
  render() {
    let style = {};

    if (this.props.devices.nodes) {
      style = {
        opacity: 1
      };
    }

    return (
      <Button device="nodes">
        <div className="node-button-container" style={style} onClick={this.onClick}></div>
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
