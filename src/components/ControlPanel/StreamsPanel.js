import React from 'react';
import Panel from './Panel';
import { connect } from 'react-redux';
import StreamListItem from './ListItem/StreamListItem';

class StreamsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.renderStreams = this.renderStreams.bind(this);
  }

  renderStreams() {
    return this.props.streams.map((stream, idx) => {
      return <StreamListItem key={idx} stream={stream} idx={idx}/>;
    });
  }

  render() {
    return (
      <Panel>
        <div className="panel-title">Streams</div>
        <div className="panel-list">
          {this.renderStreams()}
        </div>
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
