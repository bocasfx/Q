import React from 'react';
import './Settings.css';
import { connect } from 'react-redux';

class Settings extends React.Component {
  render() {
    let style = {
      right: 0
    };

    if (!this.props.devices.settings) {
      style = {
        right: '-440px'
      };
    }

    return (
      <div className="settings-container" style={style}>
        <label htmlFor="particle-count">Particle count</label>
        <input name="particle-count" type="number"/>
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
