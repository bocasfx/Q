import React from 'react';
import Knob from '../UI/Knob';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  setDelayTime,
  setDelayFeedback,
  setDelayCutoffFrequency } from '../../actions/FX';
import qAudioContext from '../../app/context/QAudioContext';
import Switch from '../UI/Switch';

class DelayPanel extends React.Component {

  constructor(props) {
    super(props);
    this.setProps(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setProps(nextProps);
  }

  setProps(props) {
    qAudioContext.time = props.fx.delay.time;
    qAudioContext.feedback = props.fx.delay.feedback;
    qAudioContext.cutoffFrequency = props.fx.delay.cutoffFrequency;
  }

  onBypassChange(event) {
    console.log(!event.target.checked);
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
    setDelayCutoffFrequency: bindActionCreators(setDelayCutoffFrequency, dispatch)
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(DelayPanel);
