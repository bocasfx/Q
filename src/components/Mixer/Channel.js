import React from 'react';
import './Channel.css';
import Fader from './Fader';
import ActivityIndicator from '../UI/ActivityIndicator';
import Knob from '../UI/Knob';
import { getNodeColor } from '../../utils/utils';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setNodeLag, setNodeAttack, setNodeRelease, setNodeProbability, setNodeDisabledStatus, setNodeSendGain } from '../../actions/Nodes';

class Channel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      channelStyle: {}
    };

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onLagChange = this.onLagChange.bind(this);
    this.onAttackChange = this.onAttackChange.bind(this);
    this.onReleaseChange = this.onReleaseChange.bind(this);
    this.onProbabilityChange = this.onProbabilityChange.bind(this);
    this.onDisabledStatusChange = this.onDisabledStatusChange.bind(this);
    this.onSendFXGainChange = this.onSendFXGainChange.bind(this);
  }

  onMouseEnter() {
    this.setState({
      channelStyle: {
        color: getNodeColor(this.props.node.type)
      }
    });
  }

  onMouseLeave() {
    this.setState({
      channelStyle: {
        color: 'darkgray'
      }
    });
  }

  onLagChange(value) {
    this.props.setNodeLag(this.props.node.id, value);
  }

  onProbabilityChange(value) {
    this.props.setNodeProbability(this.props.node.id, value);
  }

  onAttackChange(value) {
    this.props.setNodeAttack(this.props.node.id, value);
  }

  onSendFXGainChange(value) {
    this.props.setNodeSendGain(this.props.node.id, value);
  }

  onReleaseChange(value) {
    this.props.setNodeRelease(this.props.node.id, value);
  }

  onDisabledStatusChange() {
    this.props.setNodeDisabledStatus(this.props.node.id, !this.props.node.disabled);
  }

  renderKnobs() {
    if (this.props.node.type !== 'synth') {
      return null;
    }
    return ([
      <div className="channel-spacer" key="0">
        <Knob
          label={'Attack'}
          value={this.props.node.attack}
          min={0}
          max={5}
          onChange={this.onAttackChange}
          disabled={this.props.node.disabled}
          type={this.props.node.type}
          mini={true}
          key="0"/>
      </div>,
      <div className="channel-spacer" key="1">
        <Knob
          label={'Release'}
          value={this.props.node.release}
          min={0}
          max={5}
          onChange={this.onReleaseChange}
          disabled={this.props.node.disabled}
          type={this.props.node.type}
          mini={true}
          key="1"/>
      </div>
    ]);
  }

  renderFader() {
    if (this.props.node.type === 'midi') {
      return <div className='channel-fader-spacer'></div>;
    }

    return <Fader node={this.props.node}/>;
  }

  renderSendFXGain() {
    if (this.props.node.type === 'midi') {
      return null;
    }

    return <div className="channel-spacer">
      <Knob
        label={'FX Send'}
        value={this.props.node.sendFXGain}
        min={0}
        max={1}
        onChange={this.onSendFXGainChange}
        disabled={this.props.node.disabled}
        type={this.props.node.type}
        log={true}
        mini={true}/>
    </div>;
  }

  renderSelectionIndicator() {
    if (this.props.node.selected) {
      return <div className="channel-selection-indicator"></div>;
    }

    return <div className="channel-selection-spacer"></div>;
  }

  render() {
    return (
      <div className="channel-container">
        <div>
          <div className="channel-indicator">
            <ActivityIndicator item={this.props.node}/>
            {this.renderSelectionIndicator()}
          </div>
          <div className="channel-spacer">
            <Knob
              label={'Lag'}
              value={this.props.node.lag}
              min={0}
              max={5000}
              onChange={this.onLagChange}
              disabled={!this.props.node.parentIds.length || this.props.nodes.disabled}
              type={this.props.node.type}
              mini={true}/>
          </div>
          <div className="channel-spacer">
            <Knob
              label={'Probability'}
              value={this.props.node.probability}
              min={0}
              max={1}
              onChange={this.onProbabilityChange}
              disabled={this.props.node.disabled}
              type={this.props.node.type}
              log={true}
              mini={true}/>
          </div>
          {this.renderSendFXGain()}
        </div>
        {this.renderKnobs()}
        <div>
          <span data-type="off" className="channel-buttons" onClick={this.onDisabledStatusChange} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
            <i className="fa fa-power-off" style={this.state.channelStyle}></i>
          </span>
          {this.renderFader()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNodeLag: bindActionCreators(setNodeLag, dispatch),
    setNodeAttack: bindActionCreators(setNodeAttack, dispatch),
    setNodeRelease: bindActionCreators(setNodeRelease, dispatch),
    setNodeProbability: bindActionCreators(setNodeProbability, dispatch),
    setNodeDisabledStatus: bindActionCreators(setNodeDisabledStatus, dispatch),
    setNodeSendGain: bindActionCreators(setNodeSendGain, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
