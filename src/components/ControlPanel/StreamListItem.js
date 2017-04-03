import React from 'react';
import './StreamListItem.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteStream } from '../../actions/Streams';

class StreamListItem extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    event.preventDefault();
    this.props.deleteStream(this.props.id);
  }

  render() {
    return (
      <div className="stream-list-item-container">
        <div>{this.props.id}</div>
        <div className="stream-list-item-close" onClick={this.onClick}>&times;</div>
      </div>
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

