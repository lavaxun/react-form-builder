import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as inputAction from '../actions/create-action';
import CreateGroupContainer from './CreateGroup';

class CreateContainer extends Component {

  componentWillMount() {
    const { loadAutoId } = this.props.actions;
    loadAutoId(this.props.inputModels);
  }

  createNewInput(e) {
    const defaultQuestion = 'Hi?';
    const defaultQuestionType = 'text';
    const isRootInput = true;
    const { createInput } = this.props.actions;
    createInput(this.props.autoId, defaultQuestionType, defaultQuestion, isRootInput);
  }

  renderRootNodes() {
    const self = this;
    const rootIds = Object.keys(this.props.inputModels)
                    .filter(id => this.props.inputModels[id].isAtRoot)
                    .reduce((accu, key) => {
                      accu.push(this.props.inputModels[key].inputId);
                      return accu;
                    }, []);

    return rootIds.map(function(inputId) {
      return (<CreateGroupContainer
          inputId={inputId} 
          key={inputId} />);
    });
  }

  render() {
    return (
      <div className="Create-container">
        { this.renderRootNodes() }
        <button className="Create-new-input" 
          onClick={this.createNewInput.bind(this)}>Add Input</button>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    inputModels: state.create,
    autoId: state.global.autoId
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(inputAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateContainer);
