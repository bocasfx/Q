import React from 'react';
import './EditorPanel.css';
import { connect } from 'react-redux';
import _ from 'lodash';
import NodePanel from './NodePanel';

class EditorPanel extends React.Component {
  constructor(props) {
    super(props);
    this.renderObject = this.renderObject.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.state = {
      scrolling: false
    };
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

  onScroll(event) {
    this.setState({
      scrolling: !!event.target.scrollTop
    });
  }

  render() {
    let height = window.innerHeight - 301;
    let style = {
      height,
      maxHeight: height
    };

    let panelClass = 'editor-panel-container';
    panelClass += this.state.scrolling ? ' editor-panel-inset' : '';

    return (
      <div className={panelClass} style={style} onScroll={this.onScroll}>
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
