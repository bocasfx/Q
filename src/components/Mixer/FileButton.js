import React from 'react';
import './FileButton.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setNodeSource } from '../../actions/Nodes';

class FileButton extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    console.log(this.props.node.id);
    this.props.setNodeSource(this.props.node.id, event.target.files[0].name);
  }

  render() {
    return (
      <div className="file-button-container">
        <input type="file" name="file" id="file" className="inputfile" onChange={this.onChange}/>
        <label htmlFor="file">
          <i className="fa fa-folder-o"></i>
        </label>
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
