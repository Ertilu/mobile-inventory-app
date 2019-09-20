
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers'
import rpm from 'redux-promise-middleware'
import { createLogger } from 'redux-logger';

const initState = {};

const logger = createLogger();

const middleware = [rpm, logger];

const store = createStore(
	rootReducer,
	initState,
	applyMiddleware(...middleware),
)


export default store;