import React from 'react';
import './AudioNodePanel.css';
import IconButton from '../../UI/IconButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Slider from '../../UI/Slider';
import {
  setNodeSource,
  setNodeName,
  setNodeVolume,
  setNodeSendGain,
  setNodeAttack,
  setNodeRelease,
  setNodePan } from '../../../actions/Nodes';
import NodePanelHeader from '../NodePanelHeader';
import Knob from '../../UI/Knob';
import { getSelectedElements } from '../../../utils/utils';

let electron = null;
let dialog = null;
let fs = null;

if (window.require) {
  electron = window.require('electron');
  fs = window.require('fs');
  dialog = electron.remote.dialog;
}

class AudioNodePanel extends React.Component {
  constructor(props) {
    super(props);
    this.onGainChange = this.onGainChange.bind(this);
    this.onSendGainChange = this.onSendGainChange.bind(this);
    this.onAttackChange = this.onAttackChange.bind(this);
    this.onReleaseChange = this.onReleaseChange.bind(this);
    this.onPanChange = this.onPanChange.bind(this);
    this.onFileOpen = this.onFileOpen.bind(this);

    this.nodes = getSelectedElements(props.nodes);
    this.node = this.nodes[0];
  }

  componentWillReceiveProps(nextProps) {
    this.nodes = getSelectedElements(nextProps.nodes);
    this.node = this.nodes[0];
  }

  onGainChange(value) {
    this.nodes.forEach((node) => {
      this.props.setNodeVolume(node.id, value);
    });
  }

  onSendGainChange(value) {
    this.nodes.forEach((node) => {
      this.props.setNodeSendGain(node.id, value);
    });
  }

  onAttackChange(value) {
    this.nodes.forEach((node) => {
      this.props.setNodeAttack(node.id, value);
    });
  }

  onReleaseChange(value) {
    this.nodes.forEach((node) => {
      this.props.setNodeRelease(node.id, value);
    });
  }

  onPanChange(value) {
    this.nodes.forEach((node) => {
      this.props.setNodePan(node.id, value);
    });
  }

  onFileOpen() {
    if (!dialog || !fs) {
      alert('This feature is not available on the browser version of Q.');
      return;
    }

    dialog.showOpenDialog({properties: ['openFile']}, (files) => {
      fs.readFile(files[0], (err, dataBuffer) => {
        if (err) {
          alert(err);
          return;
        }
        this.props.setNodeSource(this.node.id, dataBuffer, files[0]);

        let name = files[0].split('/');
        name = name[name.length -1];
        this.props.setNodeName(this.node.id, name);
      });
    });
  }

  render() {
    return (
      <div className="audio-node-panel-container">
        <div className="row audio-node-panel-buttons">
          <IconButton onClick={this.onFileOpen} icon="folder-open-o" active={true}/>
        </div>
        <div className="row">
          <NodePanelHeader/>
        </div>
        <div className="row audio-node-panel-row">
          <Knob
            label={'Gain'}
            value={this.node.volume}
            min={0}
            max={1}
            onChange={this.onGainChange}
            disabled={this.node.disabled}
            type={this.node.type}
            log={true}/>
          <Knob
            label={'FX Send'}
            value={this.node.sendFXGain}
            min={0}
            max={1}
            onChange={this.onSendGainChange}
            disabled={this.node.disabled}
            type={this.node.type}
            log={true}/>
        </div>
        <div className="row audio-node-panel-row">
          <Knob
            label={'Attack'}
            value={this.node.attack}
            min={0}
            max={2}
            onChange={this.onAttackChange}
            disabled={this.node.disabled}
            type={this.node.type}/>
          <Knob
            label={'Release'}
            value={this.node.release}
            min={0}
            max={2}
            onChange={this.onReleaseChange}
            disabled={this.node.disabled}
            type={this.node.type}/>
        </div>
        <div className="row synth-node-panel-pan synth-node-panel-pan-labels">
          <div>L</div>
          <Slider
            min={-1}
            max={1}
            step={0.001}
            marks={0}
            value={this.node.pan}
            onChange={this.onPanChange}
            disabled={this.node.disabled}
            horizontal={true}
            type={this.node.type}/>
          <div>R</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nodes: state.nodes
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNodeSource: bindActionCreators(setNodeSource, dispatch),
    setNodeName: bindActionCreators(setNodeName, dispatch),
    setNodeVolume: bindActionCreators(setNodeVolume, dispatch),
    setNodeSendGain: bindActionCreators(setNodeSendGain, dispatch),
    setNodeAttack: bindActionCreators(setNodeAttack, dispatch),
    setNodeRelease: bindActionCreators(setNodeRelease, dispatch),
    setNodePan: bindActionCreators(setNodePan, dispatch)
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(AudioNodePanel);
