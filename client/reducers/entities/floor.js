

import * as ActionTypes from '../../actions'
import { combineReducers } from 'redux'


function allfloorsForSpecificHome(state = [], action) {
    const {payload} = action
    console.log("all floors reducer is")
    console.log(payload)

    switch (action.type) {
        case ActionTypes.FLOOR_READ_ALL_FOR_SPECIFIC_HOME_SUCCESS: {
            return action.payload.data;
        }
        default: {
            return state
        }
    }

}

export default combineReducers({
    allfloorsForSpecificHome
})

