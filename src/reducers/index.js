import { combineReducers } from 'redux';
import { weekList, weekListHasErrored, weekListIsLoading } from './week-list';

export default combineReducers({
    weekList,
    weekListHasErrored,
    weekListIsLoading
});