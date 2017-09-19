import React from 'react';
import './EditorPanel.css';
import { connect } from 'react-redux';
import _ from 'lodash';
import NodePanel from './NodePanel';
import StreamPanel from './Stream/StreamPanel';
import { getSelectedElements } from '../../utils/utils';

class EditorPanel extends React.Component {
  constructor(props) {
    super(props);
    this.renderObject = this.renderObject.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.state = {
      scrolling: false
    };
    this.node = getSelectedElements(props.nodes)[0];
    this.stream = getSelectedElements(props.streams)[0];
  }

  componentWillReceiveProps(nextProps) {
    this.node = getSelectedElements(nextProps.nodes)[0];
    this.stream = getSelectedElements(nextProps.streams)[0];
  }

  renderObject() {
    return this.props.selection.objType === 'streams' ? this.renderStream() : this.renderNode(); 
  }

  renderStream() {
    
    if (!this.stream) {
      return null;
    }
    return (
      <StreamPanel stream={this.stream}/>
    );
  }

  renderNode() {
    if (!this.node) {
      return null;
    }
    return <NodePanel node={this.node}/>;
  }

  onScroll(event) {
    this.setState({
      scrolling: !!event.target.scrollTop
    });
  }

  onKeyPress(event) {
    if(event.keyCode === 0) {
      event.preventDefault();
    }
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
      <div className={panelClass} style={style} onScroll={this.onScroll} onKeyPress={this.onKeyPress} tabIndex="1">
        <div className="editor-panel-inner">
          {this.renderObject()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nodes: state.nodes,
    streams: state.streams,
    selection: state.selection
  };
};

module.exports = connect(mapStateToProps)(EditorPanel);
