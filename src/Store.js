import { createStore, combineReducers } from 'redux';
import user from './reducers/User';

export const store = createStore(combineReducers({ user }));

export const { dispatch } = store;
