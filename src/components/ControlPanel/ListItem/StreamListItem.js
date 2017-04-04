import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteStream } from '../../../actions/Streams';
import ListItem from './ListItem';

class StreamListItem extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    event.preventDefault();
    this.props.deleteStream(this.props.stream.id);
  }

  render() {
    return (
      <ListItem idx={this.props.idx} item={this.props.stream} onClick={this.onClick}/>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteStream: bindActionCreators(deleteStream, dispatch)
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(StreamListItem);

