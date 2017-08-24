import React from 'react';
import Knob from '../UI/Knob';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './FXPanel.css';
import {
  setDelayTime,
  setDelayFeedback,
  setDelayCutoffFrequency } from '../../actions/FX';
import qAudioContext from '../../elements/QAudioContext';

class FXPanel extends React.Component {

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

  render() {
    return (
      <div>
        <div className="fx-panel-container">
          <Knob
            label={'Time'}
            value={this.props.fx.delay.time}
            min={0}
            max={1}
            onChange={this.props.setDelayTime}
            disabled={false}
            type="synth"/>
          <Knob
            label={'Feedback'}
            value={this.props.fx.delay.feedback}
            min={0}
            max={1}
            onChange={this.props.setDelayFeedback}
            disabled={false}
            type="synth"/>
        </div>
        <div className="row">
          <Knob
            label={'Cutoff'}
            value={this.props.fx.delay.cutoffFrequency}
            min={0}
            max={20000}
            onChange={this.props.setDelayCutoffFrequency}
            disabled={false}
            type="synth"/>
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

module.exports = connect(mapStateToProps, mapDispatchToProps)(FXPanel);
export default FXPanel;
