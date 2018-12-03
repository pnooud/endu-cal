import moment from 'moment';

export function getWeeks(startDate, endDate) {
    return (dispatch) => {
        dispatch(getWeeksIsLoading(true));
        console.log('IsLoading true');

        let weeks = getTrainingWeeks(startDate, endDate);
        console.log('Weeks: ' + weeks);
        if (weeks.length == 0){
            console.log('errored');
            dispatch(getWeeksHasErrored(true));
        }
        else{
            console.log('ok');
            dispatch(getWeeksFetchDataSuccess(weeks));
            dispatch(getWeeksIsLoading(false));
        }
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

var races = 
    [
        {
            name: 'Marathon des Sables',
            startDate: moment('2019-04-05 12:00'),  
            endDate: moment('2019-04-15 09:00'), 
            raceType: 'ultra',
            importance: 'A'
        },
        {
            name: 'Chester Ultra',
            startDate: moment('2019-03-02 08:00'),  
            endDate: moment('2019-03-02 18:00'), 
            raceType: 'ultra',
            importance: 'B'
        }

    ];

var getRacesForWeek = function(startDate){

    let start = moment(startDate).startOf('isoweek');
    let end = moment(startDate).endOf('isoweek');

    return races.filter(r => r.startDate.isBetween(start, end));
};

var getWeeksToRaces = function(startDate){

    let start = moment(startDate).startOf('isoweek');

    return races.map( r => (Object.assign({}, r, {weeksToRace: Math.round(moment.duration(moment(r.startDate).startOf('isoweek').diff(start)).asWeeks())})));
};

var getTrainingWeeks = function (startDate, endDate) {

    let weeks = [];
    let currentDate = getTrainingWeek(startDate);

    weeks.push(currentDate);

    while (currentDate.startDate < moment(endDate)) {
        let nextDate = moment(currentDate.startDate).add(7, 'days');
        currentDate = getTrainingWeek(nextDate);
        weeks.push(currentDate);
    }
    return weeks;
};

var getClosest = function(date, importance)
{
    // {weeksToRace: Math.round(moment.duration(moment(r.startDate).startOf('isoweek').diff(start)).asWeeks())};
    // var max = races.reduce(function(prev, current) {
    //     if (+current.id < +prev.id) {
    //         return current;
    //     } else {
    //         return prev;
    //     }
    // });
}

var getTrainingWeek = function (date) {
    return {
        key: moment(date).year().toString().concat(moment(date).isoWeek()),
        title: moment(date).format('MMMM Do YYYY'),
        races: getRacesForWeek(date),
        timeToRaces: getWeeksToRaces(date),
        // closestA: getClosest(date, 'A'),
        // closestB: getClosest(date, 'B'),
        // closestC: getClosest(date, 'C'),
        startDate: moment(date).startOf('isoweek')
    };
};