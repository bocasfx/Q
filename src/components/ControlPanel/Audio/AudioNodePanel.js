import React from 'react';
import FileButton from '../../UI/FileButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setNodeSource, setNodeName } from '../../../actions/Nodes';
import NodePanelHeader from '../NodePanelHeader';

class AudioNodePanel extends React.Component {
  constructor(props) {
    super(props);
    this.onFileChange = this.onFileChange.bind(this);
  }

  onFileChange(filePath) {
    this.props.setNodeSource(this.props.node.id, filePath);

    let name = filePath.split('/');
    name = name[name.length -1];
    this.props.setNodeName(this.props.node.id, name);
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
    setNodeSource: bindActionCreators(setNodeSource, dispatch),
    setNodeName: bindActionCreators(setNodeName, dispatch)
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(AudioNodePanel);
