import React from 'react';
import Slider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';
import './Toggle.css';

class Toggle extends React.Component {
  render() {
    return (
      <div className="toggle">
        <Slider
          vertical
          min={this.props.min}
          step={this.props.step}
          max={this.props.max}
          marks={this.props.marks}
          defaultValue={this.props.defaultValue}
          onChange={this.props.onChange}/>
      </div>
    );
  }
}

module.exports = Toggle;
