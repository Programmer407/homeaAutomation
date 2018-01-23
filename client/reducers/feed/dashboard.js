

import * as ActionTypes from '../../actions'
import { combineReducers } from 'redux'

function isLoading(state = false, action) {

    switch (action.type) {
        case ActionTypes.DASHBOARD_ALL_DATA: {
            return true
        }

        case ActionTypes.DASHBOARD_ALL_DATA_SUCCESS:
        case ActionTypes.DASHBOARD_ALL_DATA_FAILURE: {
            return false
        }
        default: {
            return state
        }
    }
}



function dashboard(state = "", action) {
    const {payload} = action
    console.log("Action payload in dashboard reducer is")
    console.log(payload)

    switch (action.type) {
        case ActionTypes.DASHBOARD_ALL_DATA_SUCCESS: {
            return action.payload;
        }
        case ActionTypes.CHANGE_HOME_MODE:
            {
            const {payload} = action
            debugger;
                state.DashboardData.overview.mode.name
            let updatedMode = state.DashboardData;
                updatedMode.overview.mode.name = payload.mode;
            return {...state,
                DashboardData : updatedMode}

        }

        default: {
            return state
        }
    }

}

export default combineReducers({
    isLoading, dashboard
})

