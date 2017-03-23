import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {toggleDevice} from '../actions/Devices';
import './Button.css';

class Button extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() { 
    this.props.toggleDevice(this.props.device);
  }

  render() {
    return (
      <div className="button-container" onClick={this.onClick}>
        {this.props.children}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleDevice: bindActionCreators(toggleDevice, dispatch)
  };
};

module.exports = connect(null, mapDispatchToProps)(Button);
