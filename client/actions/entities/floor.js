// libs
import { push } from 'react-router-redux'

// src
import { CALL_API } from '../../middleware/api'



export const FLOOR_ADD = 'FLOOR_ADD'
export const FLOOR_ADD_SUCCESS = 'FLOOR_ADD_SUCCESS'
export const FLOOR_ADD_FAILURE = 'FLOOR_ADD_FAILURE'

export function addfloor(floorName,floorType,homeID) {
    console.log("add home action has been called")
    return {
        [CALL_API]: {
            types: [
                FLOOR_ADD,
                FLOOR_ADD_SUCCESS,
                FLOOR_ADD_FAILURE
            ],
            /* endpoint: `/api/floor/add`,*/
            method: 'POST'
        },
        payload: {floorName, floorType, homeID}
    }
}