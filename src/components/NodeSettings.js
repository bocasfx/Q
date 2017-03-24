import React from 'react';
import './NodeSettings.css';
import { connect } from 'react-redux';
import { hideNodeSettings } from '../actions/Devices';
import { bindActionCreators } from 'redux';

class NodeSettings extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    event.preventDefault();
    this.props.hideNodeSettings();
  }

  render() {
    let style = {};

    if (!this.props.devices.nodeSettings) {
      style = {
        display: 'none'
      };
    }

    return (
      <div className="node-settings-container" style={style}>
        <button onClick={this.onClick}>close</button>
        <div>{this.props.devices.nodeSettingsId}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    devices: state.Devices
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideNodeSettings: bindActionCreators(hideNodeSettings, dispatch)
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(NodeSettings);
