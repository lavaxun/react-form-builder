import React, { Component } from 'react';

class PreviewBox extends Component {

  renderYesNoQuestion() {
    return (
      <div className="Preview-input Preview-yesno-input">
        <span className="checkbox">
          <input id={'y-' + this.props.inputModel.inputId} 
            name={this.props.inputModel.inputId} 
            type="radio" value="yes" 
            onChange={this.props.reevaluate} />      
          <label htmlFor={'y-' + this.props.inputModel.inputId}>
            Yes
          </label>
          <div className="check"></div>
        </span>
        <span className="checkbox">
          <input id={'n-' + this.props.inputModel.inputId} 
            name={this.props.inputModel.inputId} 
            type="radio" value="no" 
            onChange={this.props.reevaluate} />        
          <label htmlFor={'n-' + this.props.inputModel.inputId}>
              No
          </label>
          <div className="check"></div>
        </span>
      </div>
    );
  }

  renderTextQuestion() {
    return (
      <div className="Preview-input Preview-text-input">
        <input type="text" 
          onChange={this.props.reevaluate} />
      </div>
    );
  }

  renderNumberQuestion() {
    return (
      <div className="Preview-input Preview-number-input">
        <label>
          <input type="number" 
            onChange={this.props.reevaluate} />
        </label>
      </div>
    );
  }

  render() {
    return (
      <div className="Preview-box">
        <div className="Preview-question">
          <p>{this.props.inputModel.question}</p>
        </div>
        <div className="Preview-type">
          { this.props.inputModel.type === 'yesno' && 
            this.renderYesNoQuestion() }
          { this.props.inputModel.type === 'text' && 
            this.renderTextQuestion() }
          { this.props.inputModel.type === 'number' && 
            this.renderNumberQuestion() }
        </div>
      </div>
    );
  }
}

export default PreviewBox;
