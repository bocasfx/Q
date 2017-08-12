import React from 'react';
import './Menu.css';
import MenuButton from './MenuButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {toggleDevice} from '../../actions/Devices';

class Menu extends React.Component {

  onClick(device) {
    this.props.toggleDevice(device);
  }

  render() {
    return (
      <div className="menu-container">
        <MenuButton
          icon="./icons/menu/grab.svg"
          onClick={this.onClick.bind(this, 'grab')}
          active={this.props.devices.grab}
          separator={true}/>
        <MenuButton
          icon="./icons/menu/mixer.svg"
          onClick={this.onClick.bind(this, 'mixer')}
          active={this.props.devices.mixer}
          separator={true}/>
        <MenuButton
          icon="./icons/menu/clone.svg"
          onClick={this.onClick.bind(this, 'clone')}
          active={this.props.devices.clone}
          separator={true}/>
        <MenuButton
          icon="./icons/menu/stream.svg"
          onClick={this.onClick.bind(this, 'streams')}
          active={this.props.devices.streams}
          separator={true}/>
        <MenuButton
          icon="./icons/menu/circular-stream.svg"
          onClick={this.onClick.bind(this, 'circularStreams')}
          active={this.props.devices.circularStreams}
          separator={true}/>
        <MenuButton
          icon="./icons/menu/linear-stream.svg"
          onClick={this.onClick.bind(this, 'linearStreams')}
          active={this.props.devices.linearStreams}
          separator={true}/>
        <MenuButton
          icon="./icons/menu/synth.svg"
          onClick={this.onClick.bind(this, 'synthNodes')}
          active={this.props.devices.synthNodes}
          separator={true}/>
        <MenuButton
          icon="./icons/menu/midi.svg"
          onClick={this.onClick.bind(this, 'midiNodes')}
          active={this.props.devices.midiNodes}
          separator={true}/>
        <MenuButton
          icon="./icons/menu/audio.svg"
          onClick={this.onClick.bind(this, 'audioNodes')}
          active={this.props.devices.audioNodes}
          separator={true}/>
        <MenuButton
          icon="./icons/menu/link.svg"
          onClick={this.onClick.bind(this, 'link')}
          active={this.props.devices.link}
          separator={true}/>
        <MenuButton
          icon="./icons/menu/unlink.svg"
          onClick={this.onClick.bind(this, 'unlink')}
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
