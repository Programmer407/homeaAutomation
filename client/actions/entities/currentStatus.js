// libs
import { push } from 'react-router-redux'

// src
import { CALL_API } from '../../middleware/api'



export const CURRENT_STATAS_DATA = 'CURRENT_STATAS_DATA'
export const CURRENT_STATAS_DATA_SUCCESS = 'CURRENT_STATAS_DATA_SUCCESS'
export const CURRENT_STATAS_DATA_FAILURE = 'CURRENT_STATAS_DATA_FAILURE'

export function fetchCurrentStatusData() {
    console.log("Fecth current Status data action has been called")
    return {
        [CALL_API]: {
            types: [
                CURRENT_STATAS_DATA,
                CURRENT_STATAS_DATA_SUCCESS,
                CURRENT_STATAS_DATA_FAILURE
            ],
            endpoint: `/api/now`,
            method: 'GET'
        },
    }
}