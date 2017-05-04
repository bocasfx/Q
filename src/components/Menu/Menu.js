import React from 'react';
import './Menu.css';
import MenuButton from './MenuButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {toggleDevice} from '../../actions/Devices';

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.onGrabButtonClick = this.onGrabButtonClick.bind(this);
    this.onSynthNodeButtonClick = this.onSynthNodeButtonClick.bind(this);
    this.onStreamButtonClick = this.onStreamButtonClick.bind(this);
    this.onCircularStreamButtonClick = this.onCircularStreamButtonClick.bind(this);
    this.onLinearStreamButtonClick = this.onLinearStreamButtonClick.bind(this);
    this.onMidiNodeButtonClick = this.onMidiNodeButtonClick.bind(this);
    this.onAudioNodeButtonClick = this.onAudioNodeButtonClick.bind(this);
    this.onMixerButtonClick = this.onMixerButtonClick.bind(this);
    this.onLinkButtonClick = this.onLinkButtonClick.bind(this);
    this.onUnlinkButtonClick = this.onUnlinkButtonClick.bind(this);
  }

  onGrabButtonClick() {
    this.props.toggleDevice('grab');
  }

  onSynthNodeButtonClick() {
    this.props.toggleDevice('synthNodes');
  }

  onStreamButtonClick() {
    this.props.toggleDevice('streams');
  }

  onCircularStreamButtonClick() {
    this.props.toggleDevice('circularStreams');
  }

  onLinearStreamButtonClick() {
    this.props.toggleDevice('linearStreams');
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
          icon="./icons/menu/grab.svg"
          onClick={this.onGrabButtonClick}
          active={this.props.devices.grab}
          separator={true}/>
        <MenuButton
          icon="./icons/menu/stream.svg"
          onClick={this.onStreamButtonClick}
          active={this.props.devices.streams}
          separator={true}/>
        <MenuButton
          icon="./icons/menu/circular-stream.svg"
          onClick={this.onCircularStreamButtonClick}
          active={this.props.devices.circularStreams}
          separator={true}/>
        <MenuButton
          icon="./icons/menu/linear-stream.svg"
          onClick={this.onLinearStreamButtonClick}
          active={this.props.devices.linearStreams}
          separator={true}/>
        <MenuButton
          icon="./icons/menu/synth.svg"
          onClick={this.onSynthNodeButtonClick}
          active={this.props.devices.synthNodes}
          separator={true}/>
        <MenuButton
          icon="./icons/menu/midi.svg"
          onClick={this.onMidiNodeButtonClick}
          active={this.props.devices.midiNodes}
          separator={true}/>
        <MenuButton
          icon="./icons/menu/audio.svg"
          onClick={this.onAudioNodeButtonClick}
          active={this.props.devices.audioNodes}
          separator={true}/>
        <MenuButton
          icon="./icons/menu/link.svg"
          onClick={this.onLinkButtonClick}
          active={this.props.devices.link}
          separator={true}/>
        <MenuButton
          icon="./icons/menu/unlink.svg"
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
