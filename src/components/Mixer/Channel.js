import React from 'react';
import './Channel.css';
import Fader from './Fader';
import ActivityIndicator from '../UI/ActivityIndicator';

class Channel extends React.Component {
  render() {
    return (
      <div className="channel-container">
        <ActivityIndicator item={this.props.node}/>
        <Fader node={this.props.node}/>
      </div>
    );
  }
}

module.exports = Channel;
