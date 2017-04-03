import React from 'react';
import Panel from './Panel';
import { connect } from 'react-redux';

class StreamsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.renderStreams = this.renderStreams.bind(this);
  }

  renderStreams() {
    return this.props.streams.map((stream, idx) => {
      return <div key={idx}>{idx}</div>;
    });
  }

  render() {
    return (
      <Panel>
        {this.renderStreams()}
      </Panel>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    streams: state.Streams
  };
};

module.exports = connect(mapStateToProps, null)(StreamsPanel);
