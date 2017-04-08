import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CreateContainer from './containers/CreateContainer';
import PreviewContainer from './containers/PreviewContainer';
import ExportContainer from './containers/ExportContainer';

class App extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      activeTab: 'create'
    }
    this.switchTab = this.switchTab.bind(this);
  }

  switchTab(identifier) {
    console.log(identifier);
    this.setState({
      activeTab: identifier
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-container">
          <div className="tab-links">
            <a className={this.state.activeTab === 'create'?'active': ''} 
              onClick={(e) => this.switchTab('create')}>Create</a>
            <a className={this.state.activeTab === 'preview'?'active': ''}
              onClick={(e) => this.switchTab('preview')}>Preview</a>
            <a className={this.state.activeTab === 'export'?'active': ''}
              onClick={(e) => this.switchTab('export')}>Export</a>
          </div>
          { this.state.activeTab === 'create' && 
            <CreateContainer />}
          { this.state.activeTab === 'preview' && 
            <PreviewContainer />}
          { this.state.activeTab === 'export' && 
            <ExportContainer />}
        </div>
      </div>
    );
  }
}

export default App;
