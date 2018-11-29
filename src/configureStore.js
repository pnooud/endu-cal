import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import weekListReducer from "./reducers/weekListReducer";

const rootReducer = combineReducers({
    weekListReducer: weekListReducer
})


const configureStore = (env, history) => {
    return  createStore(rootReducer, applyMiddleware(thunk));
};

export default configureStore;