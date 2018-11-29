import {GET_WEEKS} from '../actions/action-types'

  const initialState = {
        weeks: []
    }

const weekListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_WEEKS:
            let weeks = getWeeks(action.startDate, action.endDate);
            return {
                weeks
            };
        default:
            return state;
    }
};


var getWeeks = function(startDate, endDate) {

    var weeks = new Array();

    var currentDate = getStartOfTheWeek(startDate);
    var finishDate = getStartOfTheWeek(endDate);

    weeks.push(currentDate);

    while (currentDate < finishDate )
    {
        weeks.push(currentDate.setDate(currentDate.getDate() + 7));
    }
}

var getStartOfTheWeek = function(date) {

    return {
        untilARace : 0,
        untilBRace : 0,
        untilCRace : 0,
        startDate : date.getDate() - date.getDay()
    }
}


export default weekListReducer;