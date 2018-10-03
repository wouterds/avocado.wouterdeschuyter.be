//@flow
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';

const DEFAULT_STATE = {};

const enhancer = compose(applyMiddleware(createSagaMiddleware()));

export default createStore(reducers, DEFAULT_STATE, enhancer);
