import React from 'react';
import './StreamPanel.css';
import ElementPanelHeader from './ElementPanelHeader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setStreamName, setStreamDisabledStatus } from '../../actions/Streams';

class StreamPanel extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onToggle = this.onToggle.bind(this);
  }

  onChange(name) {
    this.props.setStreamName(this.props.stream.id, name);
  }

  onToggle(disabled) {
    debugger;
    this.props.setStreamDisabledStatus(this.props.stream.id, disabled);
  }

  render() {
    return (
      <div className="stream-panel-container">
        <ElementPanelHeader
          onChange={this.onChange}
          onToggle={this.onToggle}
          element={this.props.stream}/>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setStreamName: bindActionCreators(setStreamName, dispatch),
    setStreamDisabledStatus: bindActionCreators(setStreamDisabledStatus, dispatch)
  };
};

module.exports = connect(null, mapDispatchToProps)(StreamPanel);
