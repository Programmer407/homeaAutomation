// libs
import { push } from 'react-router-redux'

// src
import { CALL_API } from '../../middleware/api'



export const FLOOR_ADD = 'FLOOR_ADD'
export const FLOOR_ADD_SUCCESS = 'FLOOR_ADD_SUCCESS'
export const FLOOR_ADD_FAILURE = 'FLOOR_ADD_FAILURE'

export function addfloor(name,floortype,homeId) {
    console.log("add home action has been called")
    return {
        [CALL_API]: {
            types: [
                FLOOR_ADD,
                FLOOR_ADD_SUCCESS,
                FLOOR_ADD_FAILURE
            ],
            endpoint: `/api/admin/addFloor`,
            method: 'POST'
        },
        payload: {name,homeId,floortype}
    }
}


export const FLOOR_READ_ALL_FOR_SPECIFIC_HOME = 'FLOOR_READ_ALL_FOR_SPECIFIC_HOME'
export const FLOOR_READ_ALL_FOR_SPECIFIC_HOME_SUCCESS = 'FLOOR_READ_ALL_FOR_SPECIFIC_HOME_SUCCESS'
export const FLOOR_READ_ALL_FOR_SPECIFIC_HOME_FAILURE = 'FLOOR_READ_ALL_FOR_SPECIFIC_HOME_FAILURE'

export function getAllFloorsForSpecificHome(home_id) {
    console.log("get All floor for specific home action has been called")
    debugger;
    return {
        [CALL_API]: {
            types: [
                FLOOR_READ_ALL_FOR_SPECIFIC_HOME,
                FLOOR_READ_ALL_FOR_SPECIFIC_HOME_SUCCESS,
                FLOOR_READ_ALL_FOR_SPECIFIC_HOME_FAILURE
            ],
            endpoint: `/api/admin/floor/:${home_id}`,
            method: 'GET'
        },
    }
}