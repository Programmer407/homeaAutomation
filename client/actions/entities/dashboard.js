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



export const CHANGE_HOME_MODE = 'CHANGE_HOME_MODE'
export const CHANGE_HOME_MODE_SUCCESS = 'CHANGE_HOME_MODE_SUCCESS'
export const CHANGE_HOME_MODE_FAILURE = 'CHANGE_HOME_MODE_FAILURE'

export function changeHomeMode(home_id,mode) {
    debugger;
    console.log("change mode  action has been called")
    return {
        [CALL_API]: {
            types: [
                CHANGE_HOME_MODE,
                CHANGE_HOME_MODE_SUCCESS,
                CHANGE_HOME_MODE_FAILURE
            ],
            endpoint: `/api/dashboard/setMode`,
            method: 'POST'
        },
        payload: {home_id,mode}
    }
}