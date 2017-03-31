import React from 'react';
import './Fader.css';
import Slider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';
import config from '../../config/config';
import { setNodeVolume } from '../../actions/Nodes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
    this.props.setNodeVolume(this.props.node.id, value);
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
          marks={config.fader.marks}
          defaultValue={1}
          onChange={this.onChange}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNodeVolume: bindActionCreators(setNodeVolume, dispatch)
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Fader);
