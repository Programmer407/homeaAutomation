

import * as ActionTypes from '../../actions'
import { combineReducers } from 'redux'

function isLoading(state = false, action) {

    switch (action.type) {
        case ActionTypes.CURRENT_STATAS_DATA: {
            return true
        }

        case ActionTypes.CURRENT_STATAS_DATA_SUCCESS:
        case ActionTypes.CURRENT_STATAS_DATA_FAILURE: {
            return false
        }
        default: {
            return state
        }
    }
}



function currentStatus(state = "", action) {
    const {payload} = action

    switch (action.type) {
        case ActionTypes.CURRENT_STATAS_DATA_SUCCESS: {
            return action.payload;
        }

        default: {
            return state
        }
    }

}

export default combineReducers({
    isLoading, currentStatus
})

