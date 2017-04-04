import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteNode } from '../../../actions/Nodes';
import ListItem from './ListItem';

class NodeListItem extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    event.preventDefault();
    this.props.deleteNode(this.props.node.id);
  }

  render() {
    return (
      <ListItem idx={this.props.idx} item={this.props.node} onClick={this.onClick}/>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteNode: bindActionCreators(deleteNode, dispatch)
  };
};

module.exports = connect(null, mapDispatchToProps)(NodeListItem);
