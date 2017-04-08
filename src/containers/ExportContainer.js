import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class ExportContainer extends Component {

  handleChange(e) {

  }

  render() {
    const models = JSON.stringify(this.props.inputModels);
    return (
      <div className="Export-container">
        <textarea value={models}
          onChange={this.handleChange.bind(this)} 
          rows="10"
          cols="100"
          />
      </div>
    );
  }  
}

function mapStateToProps(state, props) {
  return {
    inputModels: state.create
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ExportContainer);
