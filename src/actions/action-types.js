import moment from 'moment';

export function getWeeks(startDate, endDate) {
    return (dispatch) => {
        dispatch(getWeeksIsLoading(true));

        getTrainingWeeks(startDate, endDate)
            .then((weeks) => dispatch(getWeeksFetchDataSuccess(weeks)))
            .catch(() => dispatch(getWeeksHasErrored(true)));
    };
}

export function getWeeksHasErrored(bool) {
    return {
        type: 'GET_WEEKS_DATA_ERRORED',
        hasErrored: bool
    };
}
export function getWeeksIsLoading(bool) {
    return {
        type: 'GET_WEEKS_DATA_LOADING',
        isLoading: bool
    };
}
export function getWeeksFetchDataSuccess(items) {
    return {
        type: 'GET_WEEKS_DATA_SUCCESS',
        items
    };
}

var getTrainingWeeks = function (startDate, endDate) {

    let weeks = new Array();
    let currentDate = getTrainingWeek(startDate);

    weeks.push(currentDate);

    while (currentDate.startDate < moment(endDate)) {
        currentDate = getTrainingWeek(moment(currentDate.startDate).add(7, 'days'));
        weeks.push(currentDate);
    }

    return weeks;
};

var getTrainingWeek = function (date) {
    return {
        untilARace: 0,
        untilBRace: 0,
        untilCRace: 0,
        startDate: moment(date).startOf('isoweek')
    };
};