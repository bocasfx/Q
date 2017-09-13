import React from 'react';
import Knob from '../UI/Knob';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  setFilterCutoffFrequency,
  setFilterQ,
  setFilterAttack,
  setFilterDisabled } from '../../actions/FX';
import qAudioContext from '../../app/context/QAudioContext';
import Switch from '../UI/Switch';

class FilterPanel extends React.Component {

  constructor(props) {
    super(props);
    this.setProps(props);
    this.onBypassChange = this.onBypassChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setProps(nextProps);
    if (nextProps.fx.filter.disabled !== this.props.fx.filter.disabled) {
      let previousOutput = nextProps.fx.waveShaper.disabled ? qAudioContext.fxDestination : qAudioContext.waveShaper.output;
      let nextInput = nextProps.fx.delay.disabled ? (nextProps.fx.reverb.disabled ? qAudioContext.destination : qAudioContext.reverb.input) : qAudioContext.delay.input;
      previousOutput.disconnect();
      qAudioContext.filter.output.disconnect();
      if (nextProps.fx.filter.disabled) {
        previousOutput.connect(nextInput);
        if (!nextProps.fx.waveShaper.disabled) {
          qAudioContext.waveShaper.connect(qAudioContext.destination);
        }
      } else {
        qAudioContext.filter.connect(nextInput);
        previousOutput.connect(qAudioContext.filter.input);
        qAudioContext.filter.connect(qAudioContext.destination);
      }
    }
  }

  setProps(props) {
    qAudioContext.filterCutoffFrequency = props.fx.filter.cutoffFrequency;
    qAudioContext.filterQ = props.fx.filter.q;
    qAudioContext.filterAttack = props.fx.filter.attack;
    qAudioContext.filterRelease = props.fx.filter.release;
  }

  onBypassChange(event) {
    this.props.setFilterDisabled(!event.target.checked);
  }

  render() {
    return (
      <div className="fx-panel-item">
        <div className="fx-panel-title">Filter</div>
        <div className="fx-panel fx-panel-border-left">
          <div className="fx-panel-knob-container fx-panel-align-top">
            <Knob
              label={'Cutoff'}
              value={this.props.fx.filter.cutoffFrequency}
              min={100}
              max={20000}
              onChange={this.props.setFilterCutoffFrequency}
              disabled={this.props.fx.filter.disabled}
              type="synth"/>
            <Switch onChange={this.onBypassChange} checked={!this.props.fx.filter.disabled}/>
            <Knob
              label={'Attack'}
              value={this.props.fx.filter.attack}
              min={0}
              max={1}
              onChange={this.props.setFilterAttack}
              disabled={this.props.fx.filter.disabled}
              type="synth"/>
          </div>
          <div className="fx-panel-knob-container">
            <Knob
              label={'Q'}
              value={this.props.fx.filter.q}
              min={0}
              max={50}
              onChange={this.props.setFilterQ}
              disabled={this.props.fx.filter.disabled}
              type="synth"/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    fx: state.fx
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFilterCutoffFrequency: bindActionCreators(setFilterCutoffFrequency, dispatch),
    setFilterQ: bindActionCreators(setFilterQ, dispatch),
    setFilterAttack: bindActionCreators(setFilterAttack, dispatch),
    setFilterDisabled: bindActionCreators(setFilterDisabled, dispatch)
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(FilterPanel);
