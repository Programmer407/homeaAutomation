// libs
import { push } from 'react-router-redux'

// src
import { CALL_API } from '../../middleware/api'



export const HISTORY_DATA = 'HISTORY_DATA'
export const HISTORY_DATA_SUCCESS = 'HISTORY_DATA_SUCCESS'
export const HISTORY_DATA_FAILURE = 'HISTORY_DATA_FAILURE'

export function fetchHistoryData() {
    console.log("Fecth History data action has been called")
    return {
        [CALL_API]: {
            types: [
                HISTORY_DATA,
                HISTORY_DATA_SUCCESS,
                HISTORY_DATA_FAILURE
            ],
            endpoint: `/api/historyData`,
            method: 'GET'
        },
    }
}