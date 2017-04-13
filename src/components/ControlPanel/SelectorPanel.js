import React from 'react';
import Panel from '../Tabs/Panel';
import { connect } from 'react-redux';
import ListItem from './ListItem';
import Tabs from '../Tabs/Tabs';
import { bindActionCreators } from 'redux';
import { deleteStream, selectStream } from '../../actions/Streams';
import { deleteNode, selectNode } from '../../actions/Nodes';
import './SelectorPanel.css';

class SelectorPanel extends React.Component {
  constructor(props) {
    super(props);
    this.renderStreams = this.renderStreams.bind(this);
  }

  onDeleteStream(id, event) {
    event.preventDefault();
    this.props.deleteStream(id);
  }

  onDeleteNode(id, event) {
    event.preventDefault();
    this.props.deleteNode(id);
  }

  onCloneNode(id, event) {
    event.preventDefault();
    console.log('TODO');
  }

  onClickNode(node, event) {
    event.preventDefault();
    if (!node.selected) {
      this.props.selectNode(node.id);
    }
  }

  onClickStream(id, event) {
    event.preventDefault();
    this.props.selectStream(id);
  }

  renderStreams() {
    if (!this.props.streams.length) {
      return <div className="panel-empty">No Streams</div>;
    }

    return this.props.streams.map((stream, idx) => {
      return <ListItem
        key={idx}
        item={stream}
        idx={idx}
        onDelete={this.onDeleteStream.bind(this, stream.id)}
        onClick={this.onClickStream.bind(this, stream.id)}/>;
    });
  }

  renderNodes() {
    if (!this.props.nodes.length) {
      return <div className="panel-empty">No Nodes</div>;
    }

    return this.props.nodes.map((node, idx) => {
      return <ListItem
        key={idx}
        item={node}
        idx={idx}
        onDelete={this.onDeleteNode.bind(this, node.id)}
        onClone={this.onCloneNode.bind(this, node.id)}
        onClick={this.onClickNode.bind(this, node)}/>;
    });
  }

  render() {
    return (
      <div className="selector-panel-container">
        <Tabs>
          <Panel label="Nodes">
            {this.renderNodes()}
          </Panel>
          <Panel label="Streams">
            {this.renderStreams()}
          </Panel>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    streams: state.Streams,
    nodes: state.Nodes
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteStream: bindActionCreators(deleteStream, dispatch),
    selectStream: bindActionCreators(selectStream, dispatch),
    deleteNode: bindActionCreators(deleteNode, dispatch),
    selectNode: bindActionCreators(selectNode, dispatch)
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(SelectorPanel);
