import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class CreateBox extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      yesno: {
        conditionType: [
          { value: 'eq', label: 'Equals' },
        ],
        conditionVal: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]
      },
      number: {
        conditionType: [
          { value: 'gt', label: 'Greater than' },
          { value: 'lt', label: 'Less than' },
          { value: 'eq', label: 'Equals' }
        ]
      },
      inputType: [
        { value: 'text', label: 'Text' },
        { value: 'number', label: 'Number' },
        { value: 'yesno', label: 'Yes/No' }
      ]
    };
  }

  changeConditionVal(e) {
    console.log(e.target.value);
    this.props.changeConditionVal({
      value: e.target.value
    });
  }

  getMinimumNumber(e) {
    if (this.props.inputModel.condition && this.props.inputModel.condition.type === 'lt') {
      return 1;
    }
    return 0;
  }

  render() {
    return (
      <div className="Create-box">
      { this.props.inputModel.type === 'yesno' &&
        ( <div className="Create-condition yesno">
          <span className="label">Condition</span>
          <Select
            clearable={false}
            className="Create-question-cond"
            name="create-question-condition"
            value={this.props.inputModel.condition.type}
            options={this.state.yesno.conditionType}
            onChange={this.props.changeConditionType} />
          <Select
            clearable={false}
            className="Create-question-val"
            name="create-question-condition"
            value={this.props.inputModel.condition.val}
            options={this.state.yesno.conditionVal}
            onChange={this.props.changeConditionVal} />
        </div>
        )
      }
      { this.props.inputModel.type === 'number' &&
        ( <div className="Create-condition number">
          <span className="label">Condition</span>
          <Select
            clearable={false}
            className="Create-question-cond"
            name="create-question-condition"
            value={this.props.inputModel.condition.type}
            options={this.state.number.conditionType}
            onChange={this.props.changeConditionType} />
          <input 
            min={this.getMinimumNumber.bind(this)}
            className="Create-question-val"
            type="number" pattern="[0-9]*" inputMode="numeric"
            onChange={this.changeConditionVal.bind(this)}
            value={this.props.inputModel.condition.val} />
        </div>
        )
      }

        <div className="Create-question">
          <span className="label">Question</span>
          <input type="text" 
            onChange={this.props.updateQuestion}
            value={this.props.inputModel.question} />
        </div>
        <div className="Create-type">
          <span className="label">Type</span>
          <Select
            clearable={false}
            name="create-question-condition"
            value={this.props.inputModel.type}
            options={this.state.inputType}
            onChange={this.props.changeType} />
        </div>
        <div className="Create-button">
          <button className="Create-delete-btn" onClick={this.props.deleteInput}>Delete</button>
          <button className="Create-subinput-btn"
            onClick={this.props.addSubinput}>Add Sub-Input</button>
        </div>
      </div>
    );
  }
}

export default CreateBox;
