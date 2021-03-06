// const initialState = {
//     weekList: [],
//     hasErrored: false,
//     isLoading: false
// };


export function weekListHasErrored(state = false, action) {
    switch (action.type) {
        case 'GET_WEEKS_DATA_ERRORED':
            return action.hasErrored;
        default:
            return state;
    }
}
export function weekListIsLoading(state = false, action) {
    switch (action.type) {
        case 'GET_WEEKS_DATA_LOADING':
            return action.isLoading;
        default:
            return state;
    }
}
export function weekList(state = [], action) {
    switch (action.type) {
        case 'GET_WEEKS_DATA_SUCCESS':
            return action.weekList;
        default:
            return state;
    }
}