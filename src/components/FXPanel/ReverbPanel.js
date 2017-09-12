import React from 'react';
import Knob from '../UI/Knob';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setReverbAmount, setReverbImpulseResponse } from '../../actions/FX';
import qAudioContext from '../../app/context/QAudioContext';
import config from '../../config/config';
import Switch from '../UI/Switch';

let shell = null;

if (window.require) {
  shell = window.require('electron').shell;
}


class ReverbPanel extends React.Component {

  constructor(props) {
    super(props);
    this.setProps(props);
    this.impulseResponses = config.fx.reverb.impulseResponses;
    this.onImpulseResponseChange = this.onImpulseResponseChange.bind(this);
    this.state = {
      showReverbInfo: false
    };

    this.showReverbInfo = this.showReverbInfo.bind(this);
    this.hideReverbInfo = this.hideReverbInfo.bind(this);
    this.renderImpulseResponseInfo = this.renderImpulseResponseInfo.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setProps(nextProps);
  }

  setProps(props) {
    qAudioContext.reverbAmount = props.fx.reverb.amount;
    qAudioContext.reverbImpulseResponse = props.fx.reverb.impulseResponse;
    if (this.refs[props.fx.reverb.impulseResponse]) {
      this.refs[props.fx.reverb.impulseResponse].selected = true;
    }
  }

  onImpulseResponseChange(event) {
    event.stopPropagation();
    this.props.setReverbImpulseResponse(event.target.value);
  }

  renderIRSelect() {
    return this.impulseResponses.map((item, key) => {
      return <option ref={this.impulseResponses[key].url} key={key} value={this.impulseResponses[key].url}>{this.impulseResponses[key].label}</option>;
    });
  }

  showReverbInfo() {
    this.setState({
      showReverbInfo: true
    });
  }

  hideReverbInfo() {
    this.setState({
      showReverbInfo: false
    });
  }

  openLinkInBrowser(event) {
    let url = event.target.attributes['data-url'].nodeValue;
    if (shell) {
      shell.openExternal(url);
    }
  }

  renderImpulseResponseInfo() {
    let info = null;
    let label = null;
    let link = null;
    this.impulseResponses.forEach((response) => {
      if (response.url === this.props.fx.reverb.impulseResponse && response.info) {
        info = response.info.map((paragraph, key) => {
          return <p key={key}>{paragraph}</p>;
        });
        label = <h1 key="title">{response.label}</h1>;
        link = <a key="link" href="#" data-url={response.infoUrl} onClick={this.openLinkInBrowser}>More info</a>;
      }
    });

    return [label, info, link];
  }

  onBypassChange(event) {
    console.log(!event.target.checked);
  }

  render() {
    return (
      <div className="fx-panel-item">
        <div className="fx-panel-title">Reverb</div>
        <div className="fx-panel fx-panel-border-left fx-panel-border-right">
          <div className="fx-panel-centered">
            <Switch onChange={this.onBypassChange} checked={!this.props.fx.reverb.disabled}/>
          </div>
          <div className="fx-panel-info" hidden={!this.state.showReverbInfo}>
            <i className="fa fa-close" onClick={this.hideReverbInfo}></i>
            
            {this.renderImpulseResponseInfo()}
            
          </div>
          <div className="fx-panel-centered">
            <select onChange={this.onImpulseResponseChange}>
              {this.renderIRSelect()}
            </select>
            <i className="fx-panel-info-icon fa fa-info-circle" onClick={this.showReverbInfo}>
              
            </i>
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
    fx: state.fx,
    app: state.app
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setReverbAmount: bindActionCreators(setReverbAmount, dispatch),
    setReverbImpulseResponse: bindActionCreators(setReverbImpulseResponse, dispatch)
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(ReverbPanel);
