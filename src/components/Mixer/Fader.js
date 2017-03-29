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
    const marks ={
      0: '-0',
      0.1: '-1',
      0.2: '-2',
      0.3: '-3',
      0.4: '-4',
      0.5: '-5',
      0.6: '-6',
      0.7: '-7',
      0.8: '-8',
      0.9: '-9',
      1: '-10'
    };

    return (
      <div className="fader-container">
        <input type="text" readOnly value={this.state.value}/>
        <Slider
          vertical
          min={0}
          step={0.01}
          max={1}
          marks={marks}
          defaultValue={this.state.value}
          onChange={this.onChange}/>
      </div>
    );
  }
}

module.exports = Fader;
