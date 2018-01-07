

import * as ActionTypes from '../../actions'
import { combineReducers } from 'redux'

function isLoading(state = false, action) {

    switch (action.type) {
        case ActionTypes.ACCOUNT_CREATE: {
            return true
        }

        case ActionTypes.ACCOUNT_CREATE_SUCCESS:
        case ActionTypes.ACCOUNT_CREATE_FAILURE: {
            return false
        }
        default: {
            return state
        }
    }
}



function account(state = "", action) {
    const {payload} = action
    debugger;
    console.log("add acount reducer is")
    console.log(payload)

    switch (action.type) {
        case ActionTypes.ACCOUNT_CREATE_SUCCESS: {
            return action.payload;
        }

        default: {
            return state
        }
    }

}

export default combineReducers({
    isLoading, account
})

