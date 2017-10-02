import React from 'react';
import './Channel.css';
import Fader from './Fader';
import ActivityIndicator from '../UI/ActivityIndicator';
import Knob from '../UI/Knob';
import { getNodeColor } from '../../utils/utils';

class Channel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      channelStyle: {}
    };

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
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
          max={1}
          onChange={null}
          disabled={this.props.node.disabled}
          type={this.props.node.type}
          log={true}
          mini={true}
          key="0"/>
      </div>,
      <div className="channel-spacer" key="1">
        <Knob
          label={'Release'}
          value={this.props.node.release}
          min={0}
          max={1}
          onChange={null}
          disabled={this.props.node.disabled}
          type={this.props.node.type}
          log={true}
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
        onChange={null}
        disabled={this.props.node.disabled}
        type={this.props.node.type}
        log={true}
        mini={true}/>
    </div>;
  }

  render() {
    return (
      <div className="channel-container">
        <div>
          <div className="channel-indicator">
            <ActivityIndicator item={this.props.node}/>
          </div>
          <div className="channel-spacer">
            <Knob
              label={'Lag'}
              value={this.props.node.lag}
              min={0}
              max={1}
              onChange={null}
              disabled={this.props.node.disabled}
              type={this.props.node.type}
              log={true}
              mini={true}/>
          </div>
          <div className="channel-spacer">
            <Knob
              label={'Probability'}
              value={this.props.node.probability}
              min={0}
              max={1}
              onChange={null}
              disabled={this.props.node.disabled}
              type={this.props.node.type}
              log={true}
              mini={true}/>
          </div>
          {this.renderSendFXGain()}
        </div>
        {this.renderKnobs()}
        <div>
          <span data-type="off" className="channel-buttons" onClick={this.props.onToggle} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
            <i className="fa fa-power-off" style={this.state.channelStyle}></i>
          </span>
          {this.renderFader()}
        </div>
      </div>
    );
  }
}

export default Channel;
