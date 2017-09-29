import React from 'react';
import './SynthNodePanel.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import OscillatorPanel from './OscillatorPanel';
import Knob from '../../UI/Knob';
import Slider from '../../UI/Slider';
import NodePanelHeader from '../NodePanelHeader';
import { getSelectedElements } from '../../../utils/utils';
import {
  setNodeVolume,
  setNodeAttack,
  setNodeRelease,
  setNodePan,
  setNodeSendGain,
  setNodeNoiseGain } from '../../../actions/Nodes';

class SynthNodePanel extends React.Component {

  constructor(props) {
    super(props);

    this.onGainChange = this.onGainChange.bind(this);
    this.onAttackChange = this.onAttackChange.bind(this);
    this.onReleaseChange = this.onReleaseChange.bind(this);
    this.onPanChange = this.onPanChange.bind(this);
    this.onSendGainChange = this.onSendGainChange.bind(this);
    this.onNoiseChange = this.onNoiseChange.bind(this);

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

  onSendGainChange(value) {
    this.nodes.forEach((node) => {
      this.props.setNodeSendGain(node.id, value);
    });
  }

  onNoiseChange(value) {
    this.nodes.forEach((node) => {
      this.props.setNodeNoiseGain(node.id, value);
    });
  }

  render() {
    return (
      <div className="synth-node-panel-container">

        <div className="row">
          <NodePanelHeader/>
        </div>

        <div className="row synth-node-panel-gain">
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
        <div className="row synth-node-panel-gain">
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
            max={5}
            onChange={this.onReleaseChange}
            disabled={this.node.disabled}
            type={this.node.type}/>
        </div>
        <div className="row">
          <Knob
            label={'Noise'}
            value={this.node.noiseGain}
            min={0}
            max={1}
            onChange={this.onNoiseChange}
            disabled={this.node.disabled}
            type={this.node.type}
            log={true}/>
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
            horizontal={true}/>
          <div>R</div>
        </div>

        <div className="row-between">
          <OscillatorPanel
            name="osc1"
            label="Osc. 1"
            disabled={this.node.disabled}
            type={this.node.type}/>
          <OscillatorPanel
            name="osc2"
            label="Osc. 2"
            disabled={this.node.disabled}
            type={this.node.type}/>
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
    setNodeVolume: bindActionCreators(setNodeVolume, dispatch),
    setNodeAttack: bindActionCreators(setNodeAttack, dispatch),
    setNodeRelease: bindActionCreators(setNodeRelease, dispatch),
    setNodePan: bindActionCreators(setNodePan, dispatch),
    setNodeSendGain: bindActionCreators(setNodeSendGain, dispatch),
    setNodeNoiseGain: bindActionCreators(setNodeNoiseGain, dispatch)
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(SynthNodePanel);
