import React from 'react';
import Knob from '../UI/Knob';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './FXPanel.css';
import { setDelayTime, setDelayFeedback, setDelayCutoff } from '../../actions/FX';
import qAudioContext from '../../elements/QAudioContext';

class FXPanel extends React.Component {

  componentWillReceiveProps(nextProps) {
    qAudioContext.time = nextProps.fx.delay.time;
    qAudioContext.feedback = nextProps.fx.delay.feedback;
    qAudioContext.cutoff = nextProps.fx.delay.cutoff;
  }

  render() {
    return (
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
          value={this.props.fx.delay.cutoff}
          min={0}
          max={20000}
          onChange={this.props.setDelayCutoff}
          disabled={false}
          type="synth"/>
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
    setDelayCutoff: bindActionCreators(setDelayCutoff, dispatch)
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(FXPanel);
export default FXPanel;
