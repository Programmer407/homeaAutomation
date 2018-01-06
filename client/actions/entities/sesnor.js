// libs
import { push } from 'react-router-redux'

// src
import { CALL_API } from '../../middleware/api'



export const SENSOR_ADD = 'SENSOR_ADD'
export const SENSOR_ADD_SUCCESS = 'SENSOR_ADD_SUCCESS'
export const SENSOR_ADD_FAILURE = 'SENSOR_ADD_FAILURE'

export function addSensor(homeName,floorName,palaceName,sensorType,sensorName) {
    console.log("add senosr action has been called")
    return {
        [CALL_API]: {
            types: [
                SENSOR_ADD,
                SENSOR_ADD_SUCCESS,
                SENSOR_ADD_FAILURE
            ],
            /* endpoint: `/api/palace/add`,*/
            method: 'POST'
        },
        payload: {homeName, floorName, palaceName,sensorType,sensorName}
    }
}