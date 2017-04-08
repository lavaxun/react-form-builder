import * as types from '../actions/action-types';

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

const subinput = (state = {}, action) => {
  switch (action.type) {
    case types.CREATE_INPUT:
      return {
        inputId: action.inputId,
        question: action.payload.question,
        type: action.payload.type,
        isAtRoot: action.payload.isAtRoot || false,
        childIds: []
      };
    case types.ADD_SUBINPUT:
      return Object.assign({}, state, {
        childIds: [...state.childIds, action.payload.childId]
      });
    case types.DELETE_SUBINPUT:
      return Object.assign({}, state, {
        childIds: state.childIds.filter(function(childId) {
          return childId !== action.payload.childId;
        })
      });
    case types.CHANGE_INPUT_TYPE: 
      return Object.assign({}, state, {
        type: action.payload.type,
        condition: action.payload.condition
      });
    case types.UPDATE_QUESTION_TEXT: 
      return Object.assign({}, state, {
        question: action.payload.question
      });
    case types.CHANGE_CONDITION: 
      return Object.assign({}, state, {
        condition: action.payload.condition
      });
    default:
      return state;
  }
};

const getAllDescendantIds = (state, inputId) => (
  state[inputId].childIds.reduce((accumulate, childId) => (
    [ ...accumulate, childId, ...getAllDescendantIds(state, childId) ]
  ), [])
)

const deleteInputTree = (state, inputId) => {
  let newStateTree = deepClone(state);
  const allIdsUnderThisTree = getAllDescendantIds(newStateTree, inputId);
  const allIdsToBeDeleted = [inputId, ...allIdsUnderThisTree];
  allIdsToBeDeleted.forEach(id => delete newStateTree[id]);
  return newStateTree;
}

export default (state = {}, action) => {
  const { inputId } = action
  if (typeof inputId === 'undefined') {
    return state
  }

  if (action.type === types.REMOVE_INPUT) {
    return deleteInputTree(state, inputId);
  }

  return Object.assign({}, state, {
    [inputId]: deepClone(subinput(state[inputId], action))
  });
}