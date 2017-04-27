import React from 'react';
import './Menu.css';
import MenuButton from './MenuButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {toggleDevice} from '../../actions/Devices';

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.onSynthNodeButtonClick = this.onSynthNodeButtonClick.bind(this);
    this.onStreamButtonClick = this.onStreamButtonClick.bind(this);
    this.onMidiNodeButtonClick = this.onMidiNodeButtonClick.bind(this);
    this.onAudioNodeButtonClick = this.onAudioNodeButtonClick.bind(this);
    this.onMixerButtonClick = this.onMixerButtonClick.bind(this);
    this.onLinkButtonClick = this.onLinkButtonClick.bind(this);
    this.onUnlinkButtonClick = this.onUnlinkButtonClick.bind(this);
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

  onLinkButtonClick() {
    this.props.toggleDevice('link');
  }

  onUnlinkButtonClick() {
    this.props.toggleDevice('unlink');
  }

  render() {
    return (
      <div className="menu-container">
        <MenuButton
          icon="./icons/menu/particle.png"
          onClick={this.onStreamButtonClick}
          active={this.props.devices.streams}
          separator={true}/>
        <MenuButton
          icon="./icons/menu/synth.png"
          onClick={this.onSynthNodeButtonClick}
          active={this.props.devices.synthNodes}
          separator={true}/>
        <MenuButton
          icon="./icons/menu/midi.png"
          onClick={this.onMidiNodeButtonClick}
          active={this.props.devices.midiNodes}
          separator={true}/>
        <MenuButton
          icon="./icons/menu/audio.png"
          onClick={this.onAudioNodeButtonClick}
          active={this.props.devices.audioNodes}
          separator={true}/>
        <MenuButton
          icon="./icons/menu/link.png"
          onClick={this.onLinkButtonClick}
          active={this.props.devices.link}
          separator={true}/>
        <MenuButton
          icon="./icons/menu/unlink.png"
          onClick={this.onUnlinkButtonClick}
          active={this.props.devices.unlink}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    devices: state.devices
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleDevice: bindActionCreators(toggleDevice, dispatch)
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Menu);
