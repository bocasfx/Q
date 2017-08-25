import React from 'react';
import Knob from '../UI/Knob';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  setFilterCutoffFrequency,
  setFilterQ,
  setFilterAttack } from '../../actions/FX';
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
    qAudioContext.filterCutoffFrequency = props.fx.filter.cutoffFrequency;
    qAudioContext.filterQ = props.fx.filter.q;
    qAudioContext.filterAttack = props.fx.filter.attack;
    qAudioContext.filterRelease = props.fx.filter.release;
  }

  render() {
    return (
      <div>
        <div className="fx-panel-container">
            <Knob
              label={'Cutoff'}
              value={this.props.fx.filter.cutoffFrequency}
              min={100}
              max={20000}
              onChange={this.props.setFilterCutoffFrequency}
              disabled={false}
              type="synth"/>
            <Knob
              label={'Attack'}
              value={this.props.fx.filter.attack}
              min={0}
              max={1}
              onChange={this.props.setFilterAttack}
              disabled={false}
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
    setFilterCutoffFrequency: bindActionCreators(setFilterCutoffFrequency, dispatch),
    setFilterQ: bindActionCreators(setFilterQ, dispatch),
    setFilterAttack: bindActionCreators(setFilterAttack, dispatch)
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(FXPanel);
export default FXPanel;
