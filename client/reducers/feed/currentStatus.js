

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

        case ActionTypes.APPLIANCE_TOGGLE_SOCKET: {
            const {payload : {switch_id,status}} = action
            let newState = Object.assign({},state);
            newState.now.switches.map((switch1=>{
                if(switch1.switch_id == switch_id){
                    switch1.status = status == true ? 1 : 0
                }
            }))
            /*return Object.assign({},...state,newState);*/
            // return Object.assign({},...newState)
            return newState;
        }

        default: {
            return state
        }
    }

}

export default combineReducers({
    isLoading, currentStatus
})

