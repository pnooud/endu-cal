import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from "redux-thunk";
import rootReducer from './reducers';

const configureStore = createStore(rootReducer, applyMiddleware(thunkMiddleware)
);

export default configureStore;