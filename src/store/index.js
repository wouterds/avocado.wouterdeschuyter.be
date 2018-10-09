//@flow
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';
import reducers from './reducers';

const DEFAULT_STATE = {};

const sagaMiddleware = createSagaMiddleware();

const enhancer = compose(applyMiddleware(sagaMiddleware));

const store = createStore(reducers, DEFAULT_STATE, enhancer);

sagaMiddleware.run(sagas);

export default store;
