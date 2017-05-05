import React from 'react';
import './StreamPanel.css';
import ElementPanelHeader from '../ElementPanelHeader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setStreamName, setStreamDisabledStatus, setStreamSpeed } from '../../../actions/Streams';
import Knob from '../../UI/Knob';

class StreamPanel extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onToggle = this.onToggle.bind(this);
    this.onSpeedChange = this.onSpeedChange.bind(this);
    this.renderSpeedKnob = this.renderSpeedKnob.bind(this);
    this.state = {
      disabled: false
    };
  }

  onChange(name) {
    this.props.setStreamName(this.props.stream.id, name);
  }

  onToggle(disabled) {
    this.setState({disabled});
    this.props.setStreamDisabledStatus(this.props.stream.id, disabled);
  }

  onSpeedChange(speed) {
    this.props.setStreamSpeed(this.props.stream.id, speed);
  }

  renderSpeedKnob() {
    if (this.props.stream.class === 'freehand') {
      return null;
    }

    return <Knob
            label={'Speed'}
            value={this.props.stream.speed}
            min={0}
            max={20}
            onChange={this.onSpeedChange}
            disabled={this.state.disabled}
            type={this.props.stream.type}/>;
  }

  onCountChange(count) {
    console.log(count);
  }

  render() {
    return (
      <div className="stream-panel-container">
        <ElementPanelHeader
          onChange={this.onChange}
          onToggle={this.onToggle}
          element={this.props.stream}/>
        <div className="row">
          {this.renderSpeedKnob()}
          <Knob
            label={'Count'}
            value={this.props.stream.count}
            min={1}
            max={8}
            precision={0}
            onChange={this.onCountChange}
            disabled={this.state.disabled}
            type={this.props.stream.type}/>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setStreamName: bindActionCreators(setStreamName, dispatch),
    setStreamDisabledStatus: bindActionCreators(setStreamDisabledStatus, dispatch),
    setStreamSpeed: bindActionCreators(setStreamSpeed, dispatch)
  };
};

module.exports = connect(null, mapDispatchToProps)(StreamPanel);
