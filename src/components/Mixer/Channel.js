import React from 'react';
import './Channel.css';
import Fader from './Fader';
import ActivityIndicator from '../UI/ActivityIndicator';
import Knob from '../UI/Knob';

class Channel extends React.Component {
  render() {
    return (
      <div className="channel-container">
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
            log={true}/>
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
            log={true}/>
        </div>
        <div className="channel-spacer">
          <Knob
            label={'FX Send'}
            value={this.props.node.sendFXGain}
            min={0}
            max={1}
            onChange={null}
            disabled={this.props.node.disabled}
            type={this.props.node.type}
            log={true}/>
        </div>
        <div className="channel-spacer">
          <Knob
            label={'Attack'}
            value={this.props.node.attack}
            min={0}
            max={1}
            onChange={null}
            disabled={this.props.node.disabled}
            type={this.props.node.type}
            log={true}/>
        </div>
        <div className="channel-spacer">
          <Knob
            label={'Release'}
            value={this.props.node.release}
            min={0}
            max={1}
            onChange={null}
            disabled={this.props.node.disabled}
            type={this.props.node.type}
            log={true}/>
        </div>
        <Fader node={this.props.node}/>
      </div>
    );
  }
}

module.exports = Channel;
