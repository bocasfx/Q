import React from 'react';
import './Settings.css';
import { connect } from 'react-redux';
import { hideNodeSettings } from '../actions/Devices';
import { bindActionCreators } from 'redux';

class Settings extends React.Component {

  constructor(props) {
    super(props);
    this.hideSettings = this.hideSettings.bind(this);
  }

  hideSettings(event) {
    event.preventDefault();
    this.props.hideNodeSettings();
  }

  render() {
    let style = {
      right: 0
    };

    if (!this.props.devices.nodeSettings) {
      style = {
        right: '-440px'
      };
    }

    return (
      <div className="settings-container" style={style}>
        <button className="close" onClick={this.hideSettings}>&times;</button>
        {this.props.children}
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

module.exports = connect(mapStateToProps, mapDispatchToProps)(Settings);
