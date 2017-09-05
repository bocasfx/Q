import React from 'react';
import Knob from '../UI/Knob';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setWaveShaperAmount } from '../../actions/FX';
import qAudioContext from '../../app/context/QAudioContext';

class WaveShaperPanel extends React.Component {

  constructor(props) {
    super(props);
    this.setProps(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setProps(nextProps);
  }

  setProps(props) {
    qAudioContext.waveShaperAmount = props.fx.waveShaper.amount;
  }

  render() {
    return (
      <div className="fx-panel-item">
        <div className="fx-panel-title">WaveShaper</div>
        <div className="fx-panel fx-panel-border-left">
          <div className="fx-panel-knob-container fx-panel-full-height">
            <Knob
              label={'Amount'}
              value={this.props.fx.waveShaper.amount}
              min={0}
              max={100}
              onChange={this.props.setWaveShaperAmount}
              disabled={false}
              type="synth"
              log={true}/>
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
    setWaveShaperAmount: bindActionCreators(setWaveShaperAmount, dispatch)
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(WaveShaperPanel);
export default WaveShaperPanel;
