import React from 'react';
import Panel from '../UI/Tabs/Panel';
import { connect } from 'react-redux';
import ListItem from './ListItem';
import Tabs from '../UI/Tabs/Tabs';
import { bindActionCreators } from 'redux';
import { deleteStream, selectStream, setStreamDisabledStatus } from '../../actions/Streams';
import { deleteNode, selectNode, setNodeDisabledStatus, deselectNodes, stopNode } from '../../actions/Nodes';
import FXPanel from './FXPanel';
import FilterPanel from './FilterPanel';
import './SelectorPanel.css';

class SelectorPanel extends React.Component {
  constructor(props) {
    super(props);
    this.renderStreams = this.renderStreams.bind(this);
  }

  onDeleteStream(id, event) {
    event.preventDefault();
    this.props.nodes.forEach((node) => {
      this.props.stopNode(node.id);
    });
    this.props.deleteStream(id);
    event.stopPropagation();
  }

  onDeleteNode(id, event) {
    event.preventDefault();
    this.props.deleteNode(id);
    event.stopPropagation();
  }

  onToggleNode(node, event) {
    event.preventDefault();
    this.props.setNodeDisabledStatus(node.id, !node.disabled);
    event.stopPropagation();
  }

  onToggleStream(stream, event) {
    event.preventDefault();
    this.props.setStreamDisabledStatus(stream.id, !stream.disabled);
    event.stopPropagation();
  }

  onCloneNode(id, event) {
    event.preventDefault();
    console.log('TODO');
    event.stopPropagation();
  }

  onClickNode(node, event) {
    event.preventDefault();
    if (!event.metaKey) {
      this.props.deselectNodes();
    }
    this.props.selectNode(node.id);
  }

  onClickStream(stream, event) {
    event.preventDefault();
    this.props.selectStream(stream.id);
  }

  renderStreams() {
    if (!this.props.streams.length) {
      return null;
    }

    return this.props.streams.map((stream, idx) => {
      return <ListItem
        key={idx}
        item={stream}
        idx={idx}
        onToggle={this.onToggleStream.bind(this, stream)}
        onDelete={this.onDeleteStream.bind(this, stream.id)}
        onClick={this.onClickStream.bind(this, stream)}/>;
    });
  }

  renderNodes() {
    if (!this.props.nodes.length) {
      return null;
    }

    return this.props.nodes.map((node, idx) => {
      return <ListItem
        key={idx}
        item={node}
        idx={idx}
        onToggle={this.onToggleNode.bind(this, node)}
        onDelete={this.onDeleteNode.bind(this, node.id)}
        onClone={this.onCloneNode.bind(this, node.id)}
        onClick={this.onClickNode.bind(this, node)}/>;
    });
  }

  renderFx() {
    return <FXPanel />;
  }

  renderFilter() {
    return <FilterPanel />;
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
          <Panel label="Delay">
            {this.renderFx()}
          </Panel>
          <Panel label="Filter">
            {this.renderFilter()}
          </Panel>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    streams: state.streams,
    nodes: state.nodes
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteStream: bindActionCreators(deleteStream, dispatch),
    selectStream: bindActionCreators(selectStream, dispatch),
    deleteNode: bindActionCreators(deleteNode, dispatch),
    deselectNodes: bindActionCreators(deselectNodes, dispatch),
    selectNode: bindActionCreators(selectNode, dispatch),
    setNodeDisabledStatus: bindActionCreators(setNodeDisabledStatus, dispatch),
    setStreamDisabledStatus: bindActionCreators(setStreamDisabledStatus, dispatch),
    stopNode: bindActionCreators(stopNode, dispatch)
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(SelectorPanel);
