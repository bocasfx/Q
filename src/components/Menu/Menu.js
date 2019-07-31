import React from 'react';
import './Menu.css';
import MenuButton from './MenuButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleDevice } from '../../actions/Devices';
import { setSelection } from '../../actions/Selection';
import PropTypes from 'prop-types';

class Menu extends React.Component {

  static propTypes = {
    toggleDevice: PropTypes.func,
    setSelection: PropTypes.func,
    devices: PropTypes.object,
  }

  onClick(device) {
    this.props.toggleDevice(device);
    let selection = 'nodes';
    if (device === 'linearStreams' || device === 'circularStreams' || device === 'streams') {
      selection = 'streams';
    }
    this.props.setSelection(selection);
  }

  render() {
    return (
      <div className="menu-container">
        <MenuButton
          icon="./icons/menu/grab.svg"
          onClick={this.onClick.bind(this, 'grab')}
          active={this.props.devices.grab}
          title="Grab nodes"
          separator={true}/>
        <MenuButton
          icon="./icons/menu/midi.svg"
          onClick={this.onClick.bind(this, 'midiNodes')}
          active={this.props.devices.midiNodes}
          title="MIDI node"
          separator={true}/>
        <MenuButton
          icon="./icons/menu/linear-stream.svg"
          onClick={this.onClick.bind(this, 'linearStreams')}
          active={this.props.devices.linearStreams}
          title="Linear stream"
          separator={true}/>
        <MenuButton
          icon="./icons/menu/circular-stream.svg"
          onClick={this.onClick.bind(this, 'circularStreams')}
          active={this.props.devices.circularStreams}
          title="Circular stream"
          separator={true}/>
        <MenuButton
          icon="./icons/menu/stream.svg"
          onClick={this.onClick.bind(this, 'streams')}
          active={this.props.devices.streams}
          title="Freehand stream"
          separator={true}/>
        <MenuButton
          icon="./icons/menu/clone.svg"
          onClick={this.onClick.bind(this, 'clone')}
          active={this.props.devices.clone}
          title="Clone node"
          separator={true}/>
        <MenuButton
          icon="./icons/menu/link.svg"
          onClick={this.onClick.bind(this, 'link')}
          active={this.props.devices.link}
          title="Link nodes"
          separator={true}/>
        <MenuButton
          icon="./icons/menu/unlink.svg"
          onClick={this.onClick.bind(this, 'unlink')}
          active={this.props.devices.unlink}
          title="Unlink nodes"
          separator={false}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    devices: state.devices,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleDevice: bindActionCreators(toggleDevice, dispatch),
    setSelection: bindActionCreators(setSelection, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
