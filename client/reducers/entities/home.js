

import * as ActionTypes from '../../actions'
import { combineReducers } from 'redux'


function allHomes(state = [], action) {
    const {payload} = action
    console.log("all home reducer is")
    console.log(payload)

    switch (action.type) {
        case ActionTypes.HOME_READ_ALL_SUCCESS: {
            return action.payload.data;
        }
        default: {
            return state
        }
    }

}

export default combineReducers({
    allHomes
})

