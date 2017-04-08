import * as types from '../actions/action-types';

function getRootIdFromPreview(preview) {
  return Object.keys(preview)
          .filter(id => preview[id].isAtRoot)
          .reduce((accu, key) => {
            accu.push(preview[key].inputId);
            return accu;
          }, []);
}

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

const hasFulfilledTextInputField = (inputValue) => {
  return (inputValue && inputValue.length > 0);
}

const hasFulfilledYesNoInputField = (questionModel, inputValue) => {
  return (questionModel.condition.type === 'eq' 
    && questionModel.condition.val === inputValue);
}

const hasFulfilledNumberInputField = (questionModel, inputValue) => {
  return (questionModel.condition.type === 'eq' 
    && inputValue === questionModel.condition.val)
      ||
      (questionModel.condition.type === 'gt' 
    && inputValue > questionModel.condition.val)
      ||
      (questionModel.condition.type === 'lt' 
    && inputValue < questionModel.condition.val);
}

const getDirectDescendantIds = (state, inputId) => {
  return state[inputId].childIds;
}

const fetchDirectChilds = (state, inputId) => {
  //
  // fetch it from the __input_models__
  // which we have loaded it during the loadPreview
  // 
  let originalStateTree = deepClone(state.__input_models__);
  const newStateTree = deepClone(state);
  if (originalStateTree[inputId]) {
    const directChildIds = getDirectDescendantIds(originalStateTree, inputId);

    const directChildsOnlyStateTree = Object.keys(originalStateTree)
                      .filter(id => directChildIds.includes(parseInt(id, 10)))
                      .reduce((obj, key) => {
                        const evaluatedState = renderChildsIfConditionIsMet(originalStateTree, key);
                        obj[key] = evaluatedState[key];
                        return obj;
                      }, {});
    newStateTree[inputId].childIds = directChildIds;    
    return Object.assign({}, newStateTree, directChildsOnlyStateTree);
  }

  return newStateTree;
}

const hideDirectChilds = (state, inputId) => {
  if (state[inputId]) {
    let newStateTree = deepClone(state);
    const allIdsUnderThisTree = getDirectDescendantIds(newStateTree, inputId);
    allIdsUnderThisTree.forEach(id => delete newStateTree[id]);
    newStateTree[inputId].childIds = [];
    return newStateTree;
  }
  return state;
}

const evaluteInputCondition = (state, inputId, inputValue) => {
  const questionModel = deepClone(state[inputId]);

  if (questionModel.type === 'yesno') {
    return hasFulfilledYesNoInputField(questionModel, inputValue);
  } else if (questionModel.type === 'number') {
    return hasFulfilledNumberInputField(questionModel, inputValue);
  } 

  return hasFulfilledTextInputField(inputValue);
}

const renderChildsIfConditionIsMet = (state, inputId, inputValue) => {
  const hasMetCondition = evaluteInputCondition(state, inputId, inputValue);
  if (hasMetCondition) {
    return fetchDirectChilds(state, inputId);
  }

  return hideDirectChilds(state, inputId);
}

const fetchQuestionsAtRoot = (state, inputModels) => {
  const rootIds = getRootIdFromPreview(inputModels);
  let newState = Object.assign({}, state);
  rootIds.forEach((rootId) => {
    newState[rootId] = deepClone(inputModels[rootId]);
    newState = renderChildsIfConditionIsMet(newState, rootId);
  });

  return newState;
}

const loadPreview = (state, action) => {
  return Object.assign({},
    fetchQuestionsAtRoot(deepClone(state), state.__input_models__) // load root questions
  );
}

const resetPreview = (state, action) => {
  return Object.assign({},
    // this is the original input models from another state
    { '__input_models__': deepClone(action.payload.inputModels) }
  );
}

const removeInputFromPreview = (state, inputId) => {
  if (!inputId) {
    return state;
  }

  if (state[inputId]) {
    let newStateTree = deepClone(state);
    const allIdsUnderThisTree = getDirectDescendantIds(newStateTree, inputId);
    allIdsUnderThisTree.forEach(id => delete newStateTree[id]);
    delete newStateTree[inputId];

    return newStateTree;    
  }

  return state;
}

export default (state = {}, action) => {

  if (action.type === types.RESET_PREVIEW) {
    return resetPreview(state, action);
  } else if (action.type === types.LOAD_PREVIEW) {
    return loadPreview(state, action);
  } else if (action.type === types.EVALUATE_INPUT_FOR_PREVIEW) {
    return renderChildsIfConditionIsMet(state, action.payload.inputId, action.payload.value);
  } else if (action.type === types.REMOVE_INPUT) {
    return removeInputFromPreview(state, action.inputId);
  }

  return state;
}