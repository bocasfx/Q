import React from 'react';
import Knob from '../UI/Knob';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './FXPanel.css';
import { setDelayTime,
  setDelayFeedback,
  setDelayCutoffFrequency,
  setFilterCutoffFrequency,
  setFilterDetune,
  setFilterQ,
  setFilterAttack,
  setFilterRelease } from '../../actions/FX';
import qAudioContext from '../../elements/QAudioContext';

class FXPanel extends React.Component {

  componentWillReceiveProps(nextProps) {
    qAudioContext.time = nextProps.fx.delay.time;
    qAudioContext.feedback = nextProps.fx.delay.feedback;
    qAudioContext.cutoffFrequency = nextProps.fx.delay.cutoffFrequency;
    qAudioContext.filterCutoffFrequency = nextProps.fx.filter.cutoffFrequency;
    qAudioContext.filterDetune = nextProps.fx.filter.detune;
    qAudioContext.filterQ = nextProps.fx.filter.q;
    qAudioContext.filterAttack = nextProps.fx.filter.attack;
    qAudioContext.filterRelease = nextProps.fx.filter.release;
  }

  render() {
    return (
      <div>
        <div className="fx-panel-container">
          <div>
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
          <Knob
            label={'Cutoff'}
            value={this.props.fx.delay.cutoffFrequency}
            min={0}
            max={20000}
            onChange={this.props.setDelayCutoffFrequency}
            disabled={false}
            type="synth"/>
        </div>
        <div className="row">
          <Knob
            label={'Cutoff'}
            value={this.props.fx.filter.cutoffFrequency}
            min={0}
            max={20000}
            onChange={this.props.setFilterCutoffFrequency}
            disabled={false}
            type="synth"/>
          <Knob
            label={'Detune'}
            value={this.props.fx.filter.detune}
            min={0}
            max={100}
            onChange={this.props.setFilterDetune}
            disabled={false}
            type="synth"/>
        </div>
        <div className="row">
          <Knob
            label={'Attack'}
            value={this.props.fx.filter.attack}
            min={0}
            max={1}
            onChange={this.props.setFilterAttack}
            disabled={false}
            type="synth"/>
          <Knob
            label={'Release'}
            value={this.props.fx.filter.release}
            min={0}
            max={100}
            onChange={this.props.setFilterRelease}
            disabled={true}
            type="synth"/>
        </div>
        <div className="row">
          <Knob
            label={'Q'}
            value={this.props.fx.filter.q}
            min={0}
            max={50}
            onChange={this.props.setFilterQ}
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
    setDelayCutoffFrequency: bindActionCreators(setDelayCutoffFrequency, dispatch),
    setFilterCutoffFrequency: bindActionCreators(setFilterCutoffFrequency, dispatch),
    setFilterDetune: bindActionCreators(setFilterDetune, dispatch),
    setFilterQ: bindActionCreators(setFilterQ, dispatch),
    setFilterAttack: bindActionCreators(setFilterAttack, dispatch),
    setFilterRelease: bindActionCreators(setFilterRelease, dispatch)

  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(FXPanel);
export default FXPanel;
