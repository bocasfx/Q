import React from 'react';
import './FileButton.css';
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

    dialog.showOpenDialog({properties: ['openFile']}, (files) => {
      this.props.onChange(files[0]);
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

module.exports = FileButton;
