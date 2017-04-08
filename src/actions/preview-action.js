import * as types from './action-types';

export const evaluateInputCondition = (inputId, value) => {
  return {
    type: types.EVALUATE_INPUT_FOR_PREVIEW,
    inputId,
    payload: {
      inputId,
      value
    }
  };
}

export const resetPreview = (inputModels) => {
  return {
    type: types.RESET_PREVIEW,
    payload: {
      inputModels
    }
  };
}

export const loadPreview = () => {
  return {
    type: types.LOAD_PREVIEW
  };
}