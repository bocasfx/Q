import React from 'react';
import './Menu.css';
import MenuButton from './MenuButton';
import config from '../../config/config';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {toggleDevice} from '../../actions/Devices';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.style = {
      height: config.menu.height - 1
    };

    this.onSynthNodeButtonClick = this.onSynthNodeButtonClick.bind(this);
    this.onStreamButtonClick = this.onStreamButtonClick.bind(this);
    this.onMidiNodeButtonClick = this.onMidiNodeButtonClick.bind(this);
    this.onAudioNodeButtonClick = this.onAudioNodeButtonClick.bind(this);
    this.onMixerButtonClick = this.onMixerButtonClick.bind(this);
  }

  onSynthNodeButtonClick() {
    this.props.toggleDevice('synthNodes');
  }

  onStreamButtonClick() {
    this.props.toggleDevice('streams');
  }

  onMidiNodeButtonClick() {
    this.props.toggleDevice('midiNodes');
  }

  onAudioNodeButtonClick() {
    this.props.toggleDevice('audioNodes');
  }

  onMixerButtonClick() {
    this.props.toggleDevice('mixer');
  }

  render() {
    return (
      <div className="menu-container" style={this.style}>
        <MenuButton backgroundImage="/icons/nodes/node.png" onClick={this.onStreamButtonClick} active={this.props.devices.streams}/>
        <MenuButton backgroundImage="/icons/nodes/node.png" onClick={this.onSynthNodeButtonClick} active={this.props.devices.synthNodes}/>
        <MenuButton backgroundImage="/icons/nodes/node.png" onClick={this.onMidiNodeButtonClick} active={this.props.devices.midiNodes}/>
        <MenuButton backgroundImage="/icons/nodes/node.png" onClick={this.onAudioNodeButtonClick} active={this.props.devices.audioNodes}/>
        <MenuButton backgroundImage="/icons/nodes/node.png" onClick={this.onMixerButtonClick} active={this.props.devices.mixer}/>
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
    toggleDevice: bindActionCreators(toggleDevice, dispatch)
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Menu);
