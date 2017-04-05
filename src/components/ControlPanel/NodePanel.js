import React from 'react';
import './NodePanel.css';
import Knob from '../Mixer/Knob';

class NodePanel extends React.Component {
  constructor(props) {
    super(props);
    this.setOsc1Freq = this.setOsc1Freq.bind(this);
    this.setOsc2Freq = this.setOsc2Freq.bind(this);
  }

  setOsc1Freq(freq) {
    this.props.node.osc1freq = freq;
  }

  setOsc2Freq(freq) {
    this.props.node.osc2freq = freq;
  }

  render() {
    return (
      <div className="node-panel-container">
        <Knob
          label="Osc. 1 Freq."
          value={this.props.node.osc1freq}
          min={20}
          max={2000}
          onChange={this.setOsc1Freq}/>

        <Knob
          label="Osc. 2 Freq."
          value={this.props.node.osc2freq}
          min={20}
          max={2000}
          onChange={this.setOsc2Freq}/>
      </div>
    );
  }
}

module.exports = NodePanel;
