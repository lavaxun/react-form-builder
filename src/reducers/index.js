import create from './create-reducer.js';
import preview from './preview-reducer.js';
import global from './global-reducer.js';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  create,
  preview,
  global
});

export default rootReducer;