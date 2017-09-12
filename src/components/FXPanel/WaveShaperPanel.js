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
    // qAudioContext.fxDestination.disconnect();
    // if (nextProps.fx.waveShaper.disabled) {
    //   qAudioContext.fxDestination.connect(qAudioContext.filter.input);
    // } else {
    //   qAudioContext.fxDestination.connect(qAudioContext.waveShaper.input);
    // }
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
              <Switch onChange={this.onBypassChange}/>
            </div>
            <div className="fx-panel-knob-container fx-panel-full-height">
              <Knob
                label={'Amount'}
                value={this.props.fx.waveShaper.amount}
                min={0}
                max={100}
                onChange={this.props.setWaveShaperAmount}
                disabled={this.props.fx.waveShaper.disabled}
                type="synth"
                log={true}/>
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

module.exports = connect(mapStateToProps, mapDispatchToProps)(WaveShaperPanel);
export default WaveShaperPanel;
