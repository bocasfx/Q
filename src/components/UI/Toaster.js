import React from 'react';
import './Toaster.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hideToaster } from '../../actions/Notifications';

class Toaster extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.hideToaster();
  }

  render() {
    return (
      <div className="toaster-container" hidden={this.props.notifications.hidden}>
        <button onClick={this.onClick}>OK</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideToaster: bindActionCreators(hideToaster, dispatch)
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Toaster);
