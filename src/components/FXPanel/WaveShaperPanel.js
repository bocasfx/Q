import React from 'react';
import Knob from '../UI/Knob';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setWaveShaperAmount, setWaveShaperDisabled } from '../../actions/FX';
import qAudioContext from '../../app/context/QAudioContext';
import Switch from '../UI/Switch';

class WaveShaperPanel extends React.Component {

  constructor(props) {
    super(props);
    this.setProps(props);
    this.onBypassChange = this.onBypassChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setProps(nextProps);
    if (nextProps.fx.waveShaper.disabled !== this.props.fx.waveShaper.disabled) {

      let previousOutput = qAudioContext.fxDestination;
      let nextInput = nextProps.fx.filter.disabled ? (nextProps.fx.delay.disabled ? qAudioContext.destination : qAudioContext.delay.input) : qAudioContext.filter.input;
      let nextInput2 = nextProps.fx.filter.disabled ? (nextProps.fx.reverb.disabled ? qAudioContext.destination : qAudioContext.reverb.input) : qAudioContext.filter.input;
      previousOutput.disconnect();
      qAudioContext.waveShaper.output.disconnect();
      if (nextProps.fx.waveShaper.disabled) {
        previousOutput.connect(nextInput);
        previousOutput.connect(nextInput2);
        if (nextProps.fx.filter.disabled) {
          previousOutput.connect(qAudioContext.destination);
        }
      } else {
        qAudioContext.waveShaper.connect(nextInput);
        qAudioContext.waveShaper.connect(nextInput2);
        previousOutput.connect(qAudioContext.waveShaper.input);
        if (nextProps.fx.filter.disabled) {
          qAudioContext.waveShaper.connect(qAudioContext.destination);
        }
      }
    }
  }

  setProps(props) {
    qAudioContext.waveShaperAmount = props.fx.waveShaper.amount;
  }

  onBypassChange(event) {
    this.props.setWaveShaperDisabled(!event.target.checked);
  }

  render() {
    return (
      <div className="fx-panel-item">
        <div className="fx-panel-title">WaveShaper</div>
        <div className="fx-panel fx-panel-border-left">
          <div className="fx-panel-full-height">
            <div className="fx-panel-centered">
              <Switch onChange={this.onBypassChange} checked={!this.props.fx.waveShaper.disabled}/>
            </div>
            <div className="fx-panel-knob-container fx-panel-full-height">
              <Knob
                label={'Amount'}
                value={this.props.fx.waveShaper.amount}
                min={0}
                max={100}
                onChange={this.props.setWaveShaperAmount}
                disabled={this.props.fx.waveShaper.disabled}
                type="synth"/>
            </div>
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
    setWaveShaperAmount: bindActionCreators(setWaveShaperAmount, dispatch),
    setWaveShaperDisabled: bindActionCreators(setWaveShaperDisabled, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WaveShaperPanel);
