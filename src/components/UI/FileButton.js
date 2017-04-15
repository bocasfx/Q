import React from 'react';
import './FileButton.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setNodeSource } from '../../actions/Nodes';
let electron = null;
let dialog = null;

if (window.require) {
  electron = window.require('electron');
  dialog = electron.remote.dialog;
}

class FileButton extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if (!dialog) {
      console.error('This feature is not available on the browser version of Q.');
      return;
    }

    dialog.showOpenDialog((files) => {
      if (files && files.length) {
        this.props.setNodeSource(this.props.node.id, files[0]);
      }
    });
  }

  render() {
    return (
      <div className="file-button-container">
        <button onClick={this.onClick}>
          <i className="fa fa-folder-o"></i>
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNodeSource: bindActionCreators(setNodeSource, dispatch)
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(FileButton);
