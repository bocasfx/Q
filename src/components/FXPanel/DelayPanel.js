import React from 'react';
import Knob from '../UI/Knob';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  setDelayTime,
  setDelayFeedback,
  setDelayCutoffFrequency,
  setDelayDisabled } from '../../actions/FX';
import qAudioContext from '../../app/context/QAudioContext';
import Switch from '../UI/Switch';

class DelayPanel extends React.Component {

  constructor(props) {
    super(props);
    this.setProps(props);
    this.onBypassChange = this.onBypassChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setProps(nextProps);
    if (nextProps.fx.delay.disabled !== this.props.fx.delay.disabled) {
      let previousOutput = nextProps.fx.filter.disabled ? (nextProps.fx.waveShaper.disabled ? qAudioContext.fxDestination : qAudioContext.waveShaper.output) : qAudioContext.filter.output;
      let nextInput = qAudioContext.destination;
      previousOutput.disconnect();
      qAudioContext.delay.output.disconnect();
      if (nextProps.fx.delay.disabled) {
        previousOutput.connect(nextInput);
      } else {
        previousOutput.connect(qAudioContext.delay.input);
        previousOutput.connect(qAudioContext.destination);
        qAudioContext.delay.connect(nextInput);
        qAudioContext.delay.connect(qAudioContext.delay.input);
      }
      if (!nextProps.fx.reverb.disabled) {
        previousOutput.connect(qAudioContext.reverb.input);
      }
    }
  }

  setProps(props) {
    qAudioContext.time = props.fx.delay.time;
    qAudioContext.feedback = props.fx.delay.feedback;
    qAudioContext.cutoffFrequency = props.fx.delay.cutoffFrequency;
  }

  onBypassChange(event) {
    this.props.setDelayDisabled(!event.target.checked);
  }

  render() {
    return (
      <div className="fx-panel-item">
        <div className="fx-panel-title">Delay</div>
        <div className="fx-panel fx-panel-border-left">
          <div className="fx-panel-centered">
            <Switch onChange={this.onBypassChange} checked={!this.props.fx.delay.disabled}/>
          </div>
          <div className="fx-panel-knob-container fx-panel-full-height">
            <Knob
              label={'Time'}
              value={this.props.fx.delay.time}
              min={0}
              max={1}
              onChange={this.props.setDelayTime}
              disabled={this.props.fx.delay.disabled}
              type="synth"/>
            <Knob
              label={'Feedback'}
              value={this.props.fx.delay.feedback}
              min={0}
              max={1}
              onChange={this.props.setDelayFeedback}
              disabled={this.props.fx.delay.disabled}
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
    setDelayTime: bindActionCreators(setDelayTime, dispatch),
    setDelayFeedback: bindActionCreators(setDelayFeedback, dispatch),
    setDelayCutoffFrequency: bindActionCreators(setDelayCutoffFrequency, dispatch),
    setDelayDisabled: bindActionCreators(setDelayDisabled, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DelayPanel);
