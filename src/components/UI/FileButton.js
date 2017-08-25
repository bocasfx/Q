import React from 'react';
import './FileButton.css';
let electron = null;
let dialog = null;
let fs = null;

if (window.require) {
  electron = window.require('electron');
  fs = window.require('fs');
  dialog = electron.remote.dialog;
}

class FileButton extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if (!dialog || !fs) {
      console.error('This feature is not available on the browser version of Q.');
      return;
    }

    dialog.showOpenDialog({properties: ['openFile']}, (files) => {
      fs.readFile(files[0], (err, dataBuffer) => {
        if (err) {
          // TODO: Show notification
          console.log(err);
          return;
        }
        this.props.onChange(dataBuffer);
      });
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
