import * as types from './action-types';

export const changeCondition = (inputId, type, condition) => {
  if (type === 'yesno') {
    condition.val = condition.val || 'yes';
  } else if (type === 'number') {
    condition.val = parseInt(condition.val || 0, 10);
  }

  return {
    type: types.CHANGE_CONDITION,
    inputId,
    payload: {
      condition
    }
  };
}

export const changeType = (inputId, type) => {
  const condition = {};
  if (type === 'yesno') {
    condition.type = 'eq';
    condition.val = "yes";
  } else if (type === 'number') {
    condition.type = 'gt';
    condition.val = 0;
  }

  return {
    type: types.CHANGE_INPUT_TYPE,
    inputId,
    payload: {
      type,
      condition
    }
  };
}

export const updateQuestion = (inputId, question) => {
  return {
    type: types.UPDATE_QUESTION_TEXT,
    inputId,
    payload: {
      question
    }
  };
}

export const createInput = (id, type, question, isAtRoot) => {
  return {
    type: types.CREATE_INPUT,
    inputId: id,
    payload: {
      type, question, isAtRoot
    }
  };
}

export const addSubinput = (inputId, childId) => {
  return {
    type: types.ADD_SUBINPUT,
    inputId,
    payload: {
      childId
    }
  };
}

export const deleteSubinput = (inputId, childId) => {
  return {
    type: types.DELETE_SUBINPUT,
    inputId,
    payload: {
      childId
    }
  };
}

export const removeInput = (inputId) => {
  return {
    type: types.REMOVE_INPUT,
    inputId
  };
}

export const loadAutoId = (inputModels) => {
  return {
    type: types.GET_INCREMENT_ID,
    payload: {
      inputModels
    }
  };
}