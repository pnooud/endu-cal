import moment from 'moment';

export function getWeeks(startDate, endDate) {
    return (dispatch) => {
        dispatch(getWeeksIsLoading(true));

        let weeks = getTrainingWeeks(startDate, endDate);
            
        if (weeks.length == 0){
            dispatch(getWeeksHasErrored(true));
        }
        else{
            dispatch(getWeeksFetchDataSuccess(weeks));
            dispatch(getWeeksIsLoading(false));
        }
       // return weeks;
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
export function getWeeksFetchDataSuccess(weekList) {
    return {
        type: 'GET_WEEKS_DATA_SUCCESS',
        weekList
    };
}

var getTrainingWeeks = function (startDate, endDate) {

    let weeks = new Array();
    let currentDate = getTrainingWeek(startDate);

    weeks.push(currentDate);

    while (currentDate.startDate < moment(endDate)) {
        let nextDate = moment(currentDate.startDate).add(7, 'days');
        currentDate = getTrainingWeek(nextDate);
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