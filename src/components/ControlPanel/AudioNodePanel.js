import React from 'react';
import FileButton from '../UI/FileButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setNodeSource } from '../../actions/Nodes';
import NodePanelHeader from './NodePanelHeader';

class AudioNodePanel extends React.Component {
  constructor(props) {
    super(props);
    this.onFileChange = this.onFileChange.bind(this);
  }

  onFileChange(files) {
    if (files && files.length) {
      this.props.setNodeSource(this.props.node.id, files[0]);
    }
  }

  render() {
    return (
      <div className="audio-node-panel-container">
        <div className="row">
          <FileButton onChange={this.onFileChange}/>
        </div>
        <div className="row">
          <NodePanelHeader node={this.props.node}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nodes: state.nodes
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNodeSource: bindActionCreators(setNodeSource, dispatch)
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(AudioNodePanel);
