import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteNode, selectNode } from '../../../actions/Nodes';
import ListItem from './ListItem';

class NodeListItem extends React.Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onDelete(event) {
    event.preventDefault();
    this.props.deleteNode(this.props.node.id);
  }

  onClick(event) {
    event.preventDefault();
    this.props.selectNode(this.props.node.id);
  }

  render() {
    return (
      <ListItem
        idx={this.props.idx}
        item={this.props.node}
        onDelete={this.onDelete}
        onClick={this.onClick}/>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteNode: bindActionCreators(deleteNode, dispatch),
    selectNode: bindActionCreators(selectNode, dispatch)

  };
};

module.exports = connect(null, mapDispatchToProps)(NodeListItem);
