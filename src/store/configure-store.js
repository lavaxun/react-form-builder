import rootReducer from '../reducers';
import {createStore, applyMiddleware, compose} from 'redux';
import persistState from 'redux-localstorage';

/* eslint-disable no-underscore-dangle */
export default (initialState) => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    rootReducer, 
    initialState, 
    composeEnhancers(
      persistState('create')  // store only input object models
    )
  );
  return store;
};
/* eslint-enable */