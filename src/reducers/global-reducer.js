import * as types from '../actions/action-types';

const getIncrementId = (state, inputModels) => {
  const inputIds = Object.keys(inputModels).map((id) => parseInt(id, 10));
  let latestId = 0;
  if (inputIds && inputIds.length > 0) {
    latestId = Math.max( ...inputIds );
  }
  let nextId = latestId ? ++latestId : 0;
  return Object.assign({}, state, {
    'autoId': nextId
  });
}

const increaseId = (state) => {
  return Object.assign({}, state, {
    'autoId': ++state.autoId
  });
}

export default (state = { rootIds: [] }, action) => {
  if (action.type === types.GET_INCREMENT_ID) {
    return getIncrementId(state, action.payload.inputModels);
  } else if (action.type === types.CREATE_INPUT) {
    return increaseId(state);
  }

  return state;
}