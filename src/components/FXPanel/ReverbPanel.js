import React from 'react';
import Knob from '../UI/Knob';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setReverbAmount } from '../../actions/FX';
import qAudioContext from '../../config/context/QAudioContext';

class ReverbPanel extends React.Component {

  constructor(props) {
    super(props);
    this.setProps(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setProps(nextProps);
  }

  setProps(props) {
    qAudioContext.reverbAmount = props.fx.reverb.amount;
  }

  render() {
    return (
      <div>
        <div className="fx-panel-title">Reverb</div>
        <div className="fx-panel fx-panel-border-left fx-panel-border-right">
          <div className="fx-panel-knob-container">
            <Knob
              label={'Amount'}
              value={this.props.fx.reverb.amount}
              min={0}
              max={1}
              onChange={this.props.setReverbAmount}
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
    setReverbAmount: bindActionCreators(setReverbAmount, dispatch)
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(ReverbPanel);
