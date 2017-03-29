import React from 'react';
import './Fader.css';
import Slider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';

class Fader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    this.setState({ 
      value: parseFloat((value * 10).toFixed(1), 10)
    });
  }

  render() {
    return (
      <div className="fader-container">
        <input type="text" readOnly value={this.state.value}/>
        <Slider
          vertical
          min={0}
          step={0.01}
          max={1}
          defaultValue={this.state.value}
          onChange={this.onChange}/>
      </div>
    );
  }
}

module.exports = Fader;
