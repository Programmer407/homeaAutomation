// libs
import { push } from 'react-router-redux'

// src
import { CALL_API } from '../../middleware/api'



export const SENSOR_ADD = 'SENSOR_ADD'
export const SENSOR_ADD_SUCCESS = 'SENSOR_ADD_SUCCESS'
export const SENSOR_ADD_FAILURE = 'SENSOR_ADD_FAILURE'

export function addSensor(homeId,floorId,palaceId,sensorType,name) {
    console.log("add senosr action has been called")
    return {
        [CALL_API]: {
            types: [
                SENSOR_ADD,
                SENSOR_ADD_SUCCESS,
                SENSOR_ADD_FAILURE
            ],
            endpoint: `/api/admin/addSensor`,
            method: 'POST'
        },
        payload: {name,sensorType,palaceId,floorId,homeId}
    }
}

export const SENSOR_VALUE_SOCKET = 'SENSOR_VALUE_SOCKET'


export function changeSensorValueSocket(sensorData) {
    const {id,value,type,home_id} = sensorData
    console.log("sensor value socket action has been called")
    return {
        type: SENSOR_VALUE_SOCKET,
        payload: {id,value,type,home_id}
    }
}