import React from 'react';
import Knob from '../UI/Knob';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setReverbAmount } from '../../actions/FX';
import qAudioContext from '../../app/context/QAudioContext';
import config from '../../config/config';

class ReverbPanel extends React.Component {

  constructor(props) {
    super(props);
    this.setProps(props);
    this.urls = config.fx.reverb.urls;
    this.labels = config.fx.reverb.labels;
  }

  componentWillReceiveProps(nextProps) {
    this.setProps(nextProps);
  }

  setProps(props) {
    qAudioContext.reverbAmount = props.fx.reverb.amount;
  }

  onIRChange(value) {
    console.log(value);
  }

  renderIRSelect() {
    return this.urls.map((item, key) => {
      return <option key={key}>{this.labels[key]}</option>;
    });
  }

  render() {
    return (
      <div className="fx-panel-item">
        <div className="fx-panel-title">Reverb</div>
        <div className="fx-panel fx-panel-border-left fx-panel-border-right">
          <div className="fx-panel-centered">
            <select onChange={this.onIRChange}>
              {this.renderIRSelect()}
            </select>
          </div>
          <div className="fx-panel-knob-container fx-panel-full-height">
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
