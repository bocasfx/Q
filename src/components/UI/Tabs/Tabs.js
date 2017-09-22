import React from 'react';
import './Tabs.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setSelection } from '../../../actions/Selection';

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0
    };

    this.renderTitles = this.renderTitles.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selection.objType === 'streams') {
      this.setState({
        selected: 1
      });
    } else {
      this.setState({
        selected: 0
      });
    }
  }

  onClick(idx, event) {
    event.preventDefault();
    this.setState({
      selected: idx
    });
    this.props.setSelection(this.props.children[idx].props.label.toLowerCase());
  }

  renderTitles() {
    return this.props.children.map((child, idx) => {
      let selectedClass = idx === this.state.selected ? 'tabs-selected' : null;
      return (
        <a href="#" onClick={this.onClick.bind(this, idx)} key={idx}>
          <div className={selectedClass}>
            {child.props.label}
          </div>
        </a>
      );
    });
  }

  render() {
    return (
      <div className="tabs-container">
        <div className="tabs-labels">
          {this.renderTitles()}
        </div>
        <div className="tabs-content">
          {this.props.children[this.state.selected]}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selection: state.selection
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelection: bindActionCreators(setSelection, dispatch)
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Tabs);
