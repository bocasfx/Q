import React from 'react';
import './EditorPanel.css';
import { connect } from 'react-redux';
import _ from 'lodash';
import NodePanel from './NodePanel';

class EditorPanel extends React.Component {
  constructor(props) {
    super(props);
    this.renderObject = this.renderObject.bind(this);
  }

  renderObject() {
    return this.props.selection.objType === 'streams' ? this.renderStream() : this.renderNode(); 
  }

  renderStream() {
    let stream = this.getSelectedStream();
    if (!stream) {
      return null;
    }
    return (
      <div>
        <div>{stream.name}</div>
      </div>
    );
  }

  renderNode() {
    let node = this.getSelectedNode();
    if (!node) {
      return null;
    }
    return <NodePanel node={node}/>;
  }

  getSelectedStream() {
    return _.filter(this.props.streams, (stream) => {
      return stream.selected;
    })[0];
  }

  getSelectedNode() {
    return _.filter(this.props.nodes, (node) => {
      return node.selected;
    })[0];
  }

  render() {
    return (
      <div className="editor-panel-container">
        <div className="editor-panel-inner">
          {this.renderObject()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nodes: state.Nodes,
    streams: state.Streams,
    selection: state.Selection
  };
};

module.exports = connect(mapStateToProps)(EditorPanel);
