import promises from 'redux-promise-middleware';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import user from './reducers/User';

export const store = applyMiddleware(promises())(createStore)(combineReducers({ user }));

export const { dispatch } = store;
