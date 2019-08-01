import React from 'react';
import './EditorPanel.css';
import { connect } from 'react-redux';
import NodePanel from './NodePanel';
import StreamPanel from './Stream/StreamPanel';
import { getSelectedElements } from '../../utils/utils';
import PropTypes from 'prop-types';

class EditorPanel extends React.Component {
  static propTypes = {
    nodes: PropTypes.array,
    streams: PropTypes.array,
    selection: PropTypes.object,
  };
  constructor(props) {
    super(props);
    this.renderObject = this.renderObject.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.state = {
      scrolling: false,
      height: window.innerHeight - 307,
    };
    this.nodes = getSelectedElements(props.nodes);
    this.node = this.nodes[0];
    this.stream = getSelectedElements(props.streams)[0];
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillReceiveProps(nextProps) {
    this.nodes = getSelectedElements(nextProps.nodes);
    this.node = this.nodes[0];
    this.stream = getSelectedElements(nextProps.streams)[0];
  }

  renderObject() {
    return this.props.selection.objType === 'streams' ? this.renderStream() : this.renderNode();
  }

  renderStream() {
    if (!this.stream) {
      return null;
    }
    return <StreamPanel stream={this.stream} />;
  }

  renderNode() {
    if (!this.node) {
      return null;
    }
    return <NodePanel node={this.node} />;
  }

  onScroll(event) {
    this.setState({
      scrolling: !!event.target.scrollTop,
    });
  }

  onKeyPress(event) {
    if (event.keyCode === 0) {
      event.preventDefault();
    }
  }

  updateDimensions() {
    this.setState({
      height: window.innerHeight - 307,
    });
  }

  render() {
    let style = {
      height: this.state.height,
      maxHeight: this.state.height,
    };

    let panelClass = 'editor-panel-container';
    panelClass += this.state.scrolling ? ' editor-panel-inset' : '';

    return (
      <div
        className={panelClass}
        style={style}
        onScroll={this.onScroll}
        onKeyPress={this.onKeyPress}
        tabIndex="1"
      >
        <div className="editor-panel-inner">{this.renderObject()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    nodes: state.nodes,
    streams: state.streams,
    selection: state.selection,
  };
};

export default connect(mapStateToProps)(EditorPanel);
