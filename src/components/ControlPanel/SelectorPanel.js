import React from 'react';
import Panel from './Panel';
import { connect } from 'react-redux';
import StreamListItem from './ListItem/StreamListItem';
import NodeListItem from './ListItem/NodeListItem';
import Tabs from '../Tabs/Tabs';

class SelectorPanel extends React.Component {
  constructor(props) {
    super(props);
    this.renderStreams = this.renderStreams.bind(this);
  }

  renderStreams() {
    if (!this.props.streams.length) {
      return <div className="panel-empty">No Streams</div>;
    }

    return this.props.streams.map((stream, idx) => {
      return <StreamListItem key={idx} stream={stream} idx={idx}/>;
    });
  }

  renderNodes() {
    if (!this.props.streams.length) {
      return <div className="panel-empty">No Nodes</div>;
    }

    return this.props.nodes.map((node, idx) => {
      return <NodeListItem key={idx} node={node} idx={idx}/>;
    });
  }

  render() {
    return (
      <Tabs>
        <Panel label="Streams">
          {this.renderStreams()}
        </Panel>
        <Panel label="Nodes">
          {this.renderNodes()}
        </Panel>
      </Tabs>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    streams: state.Streams,
    nodes: state.Nodes
  };
};

module.exports = connect(mapStateToProps, null)(SelectorPanel);
