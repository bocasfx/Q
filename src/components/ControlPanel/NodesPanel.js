import React from 'react';
import Panel from './Panel';
import { connect } from 'react-redux';
import NodeListItem from './ListItem/NodeListItem';

class NodesPanel extends React.Component {
  constructor(props) {
    super(props);
    this.renderNodes = this.renderNodes.bind(this);
  }

  renderNodes() {
    return this.props.nodes.map((node, idx) => {
      return <NodeListItem key={idx} node={node} idx={idx}/>;
    });
  }

  render() {
    return (
      <Panel>
        <div className="panel-title">Nodes</div>
        <div className="panel-list">
          {this.renderNodes()}
        </div>
      </Panel>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nodes: state.Nodes
  };
};

module.exports = connect(mapStateToProps, null)(NodesPanel);
