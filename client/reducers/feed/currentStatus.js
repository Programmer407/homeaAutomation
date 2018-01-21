

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
            debugger;
            const {payload : {switch_id,status}} = action
          let updatedSwitches = state.now.switches;
            updatedSwitches.map((switch1=>{
                if(switch1.switch_id == switch_id){
                    switch1.status = status == true ? 1 : 0
                }
            }))
          return {
              ...state,
              now : {
                  ...state.now ,
                  switches : updatedSwitches
              }
          }

        }


        case ActionTypes.SENSOR_VALUE_SOCKET: {
            debugger;
            const {payload : {sensor_id,value}} = action
            let updatedSensorValue = state.now.sensors;
            updatedSensorValue.map((sensor1=>{
                if(sensor1.sensor_id == sensor_id){
                    sensor1.value = value
                }
            }))
            return {
                ...state,
                now : {
                    ...state.now ,
                    sensors : updatedSensorValue
                }
            }

        }


        default: {
            return state
        }
    }

}

export default combineReducers({
    isLoading, currentStatus
})

