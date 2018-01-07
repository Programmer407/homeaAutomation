// libs
import { push } from 'react-router-redux'

// src
import { CALL_API } from '../../middleware/api'



export const ALERT_SUCCESS = 'ALERT_SUCCESS'
export const ALERT_ERROR = 'ALERT_ERROR'
export const ALERT_CLEAR = 'ALERT_CLEAR'



export function success(message) {
    console.log("success action has been called")
    return {
        [CALL_API]: {
            types: [
                ALERT_SUCCESS,
            ],
        },
        payload: {message}
    }
}



export function error(message) {
    console.log("error has been called")
    return {
        [CALL_API]: {
            types: [
                ALERT_ERROR,
            ],
        },
        payload: {message}
    }
}



export function clear() {
    console.log("clear action has been called")
    return {
        [CALL_API]: {
            types: [
                ALERT_CLEAR,
            ],
        },
        payload: {message}
    }
}



