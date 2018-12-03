export function racesHasErrored(state = false, action) {
    switch (action.type) {
        case 'GET_RACES_DATA_ERRORED':
            return action.hasErrored;
        default:
            return state;
    }
}
export function racesIsLoading(state = false, action) {
    switch (action.type) {
        case 'GET_RACES_DATA_LOADING':
            return action.isLoading;
        default:
            return state;
    }
}
export function races(state = [], action) {
    switch (action.type) {
        case 'GET_RACES_DATA_SUCCESS':
            return action.raceList;
        default:
            return state;
    }
}