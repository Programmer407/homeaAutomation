// libs
import { push } from 'react-router-redux'

// src
import { CALL_API } from '../../middleware/api'



export const DASHBOARD_ALL_DATA = 'DASHBOARD_ALL_DATA'
export const DASHBOARD_ALL_DATA_SUCCESS = 'DASHBOARD_ALL_DATA_SUCCESS'
export const DASHBOARD_ALL_DATA_FAILURE = 'DASHBOARD_ALL_DATA_FAILURE'

export function fetchDashboardData() {
    console.log("Fecth datchboard data action has been called")
    return {
        [CALL_API]: {
            types: [
                DASHBOARD_ALL_DATA,
                DASHBOARD_ALL_DATA_SUCCESS,
                DASHBOARD_ALL_DATA_FAILURE
            ],
             endpoint: `/api/dashboard`,
            method: 'GET'
        },
    }
}