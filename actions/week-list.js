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
            startDate: moment('2020-04-05 12:00'),  
            endDate: moment('2020-04-15 09:00'), 
            raceType: 'ultra',
            importance: 'A'
        },
        {
            name: 'Chester Ultra',
            startDate: moment('2020-03-02 08:00'),  
            endDate: moment('2020-03-02 18:00'), 
            raceType: 'ultra',
            importance: 'B'
        },
        {
            name: 'Gran Canaria Maratón',
            startDate: moment('2020-01-27 12:00'),  
            endDate: moment('2020-01-27 16:00'), 
            raceType: 'marathon',
            importance: 'C'
        }

    ];

var getRacesForWeek = function(startDate){

    let start = moment(startDate).startOf('isoweek');
    let end = moment(startDate).endOf('isoweek');

    return races.filter(r => r.startDate.isBetween(start, end));
};

var getWeeksToRaces = function(fromDate){

    return races.map( r => (Object.assign({}, r, {weeksToRace: weekDifference(r.startDate,fromDate) })));
};

var weekDifference= function(fromDate, toDate)
{
    let start = moment(toDate).startOf('isoweek');
    return Math.round(moment.duration(moment(fromDate).startOf('isoweek').diff(start)).asWeeks());
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

var getClosestRace = function(date, importance)
{
    let importanceRaces = races.filter(r => r.importance == importance);
    if (importanceRaces.length == 0){
        return null;
    }

    let max = importanceRaces.reduce(function(prev, current) {
        if ((+weekDifference(current.startDate, date) < +weekDifference(prev.startDate, date))) {
            return (weekDifference(current.startDate, date));
        } else {
            return  weekDifference(prev.startDate, date);
        }
    });
    return weekDifference(max.startDate, date);
}

var getTrainingWeek = function (date) {
    return {
        key: moment(date).year().toString().concat(moment(date).isoWeek()),
        title: getRacesForWeek(date).length == 0 ? moment(date).startOf('isoweek').format('MMMM Do').concat(' A:', getClosestRace(date, 'A'))  : getRacesForWeek(date).map(r => moment(r.startDate).format('MMMM Do').concat(' - ', r.name).toString()),
        races: getRacesForWeek(date),
        timeToRaces: getWeeksToRaces(date),
        closestA: getClosestRace(date, 'A'),
        closestB: getClosestRace(date, 'B'),
        closestC: getClosestRace(date, 'C'),
        startDate: moment(date).startOf('isoweek'),
        isStartOfYear: moment(date).week() == 1 ? true: false

    };
};