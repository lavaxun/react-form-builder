import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as inputAction from '../actions/create-action';
import CreateBox from '../components/CreateBox';

class CreateGroup extends Component {

  addSubinput(e) {
    const { createInput, addSubinput } = this.props.actions;
    const thisInput = this.props.input;
    let newSubinput = createInput(this.props.autoId, 'text', 'new question');
    addSubinput(thisInput.inputId, newSubinput.inputId);
  }

  deleteInput(e) {
    const { removeInput, deleteSubinput } = this.props.actions;
    const thisInput = this.props.input;
    const parentId = this.props.parentId;
    
    deleteSubinput(parentId, thisInput.inputId);
    removeInput(thisInput.inputId);
  }

  updateQuestion(e) {
    this.props.actions.updateQuestion(this.props.input.inputId, e.target.value)
  }

  changeType(select) {
    this.props.actions.changeType(this.props.input.inputId, select.value)
  }

  alwaysUpdateInputCondition(type, val) {
    const thisInput = this.props.input;
    this.props.actions.changeCondition(
      thisInput.inputId, 
      thisInput.type,
      {
        type: type,
        val: val
      }
    );    
  }

  changeConditionType(select) {    
    const thisInput = this.props.input;
    const conditionType = select.value;
    const conditionVal = thisInput.condition ? thisInput.condition.val : undefined;
    this.alwaysUpdateInputCondition(conditionType, conditionVal);
  }

  changeConditionVal(select) {
    const thisInput = this.props.input;    
    const conditionVal = select.value;
    const conditionType = thisInput.condition ? thisInput.condition.type : undefined;
    this.alwaysUpdateInputCondition(conditionType, conditionVal);
  }

  renderSubinputs(childIds) {
    const self = this;
    return childIds.map(function(inputId) {
      return (
        <CreateGroupContainer
          parentId={self.props.inputId}
          inputId={inputId} 
          key={inputId} />
      );
    });
  }

  render() {
    const inputId = this.props.inputId;
    const thisInput = this.props.input;

    return (
      <div className="Create-list">
        <div className="Create-parent">
          <CreateBox 
            addSubinput={this.addSubinput.bind(this)}
            deleteInput={this.deleteInput.bind(this)}
            updateQuestion={this.updateQuestion.bind(this)}
            changeType={this.changeType.bind(this)}
            changeConditionType={this.changeConditionType.bind(this)}
            changeConditionVal={this.changeConditionVal.bind(this)}
            inputModel={thisInput} />
          <div className="Create-child">
            {this.renderSubinputs(thisInput.childIds)}
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state, props) {
  return {
    input: state.create[props.inputId],
    autoId: state.global.autoId
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(inputAction, dispatch)
  }
}

const CreateGroupContainer = connect(mapStateToProps, mapDispatchToProps)(CreateGroup);
export default CreateGroupContainer;
