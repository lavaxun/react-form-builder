import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as previewAction from '../actions/preview-action';
import PreviewGroup from './PreviewGroup';

class PreviewContainer extends Component {

  constructor(props, context) {
    super(props, context);
    const rootIds = this.getRootIdFromPreview(props.preview);
    this.state = {
      rootIds: rootIds
    };
  }

  getRootIdFromPreview(preview) {
    return Object.keys(preview)
            .filter(id => preview[id].isAtRoot)
            .reduce((accu, key) => {
              accu.push(preview[key].inputId);
              return accu;
            }, []);
  }

  componentWillMount() {
    this.props.actions.resetPreview(this.props.inputModels);
    this.props.actions.loadPreview();
  }

  componentWillReceiveProps(nextProps) {
    const rootIds = this.getRootIdFromPreview(nextProps.preview);
    this.setState({
      rootIds
    });    
  }

  renderRootNodes() {
    const self = this;
    const rootIds = this.state.rootIds;
    // console.log(rootIds);
    // console.log(Object.keys(this.props.inputModels));
    return rootIds.map(function(inputId) {
      return (<PreviewGroup
          inputId={inputId} 
          inputModels={self.props.inputModels}
          key={inputId} />);
    });
  }

  render() {
    return (
      <div className="Preview-container">
        { this.renderRootNodes() }
      </div>
    );
  }  
}

function mapStateToProps(state, props) {
  return {
    preview: state.preview,
    inputModels: state.create
  };
}

function mapDispatchToProps(dispatch, getState) {
  return {
    actions: bindActionCreators(previewAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PreviewContainer);
