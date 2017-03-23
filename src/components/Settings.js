import React from 'react';
import './Settings.css';
import { connect } from 'react-redux';

class Settings extends React.Component {
  render() {
    let style = {};

    if (!this.props.devices.settings) {
      style = {
        display: 'none'
      };
    }

    return (
      <div className="settings-container" style={style}>
        <label htmlFor="particle-count">Particle count</label>
        <input name="particle-count" type="text"/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    devices: state.Devices
  };
};

// const mapDispatchToProps = () => {
//   return {
//   };
// };

module.exports = connect(mapStateToProps, null)(Settings);
