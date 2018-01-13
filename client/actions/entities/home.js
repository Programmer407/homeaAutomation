// libs
import { push } from 'react-router-redux'

// src
import { CALL_API } from '../../middleware/api'



export const HOME_ADD = 'HOME_ADD'
export const HOME_ADD_SUCCESS = 'HOME_ADD_SUCCESS'
export const HOME_ADD_FAILURE = 'HOME_ADD_FAILURE'

export function addHome(name,description,accountId) {
    console.log("add home action has been called")
    return {
        [CALL_API]: {
            types: [
                HOME_ADD,
                HOME_ADD_SUCCESS,
                HOME_ADD_FAILURE
            ],
            endpoint: `/api/admin/addHome`,
            method: 'POST'
        },
        payload: {name,description,accountId}
    }
}

export const HOME_READ_ALL = 'HOME_READ_ALL'
export const HOME_READ_ALL_SUCCESS = 'HOME_READ_ALL_SUCCESS'
export const HOME_READ_ALL_FAILURE = 'HOME_READ_ALL_FAILURE'

export function getAllHomes() {
    console.log("get All home action has been called")
    return {
        [CALL_API]: {
            types: [
                HOME_READ_ALL,
                HOME_READ_ALL_SUCCESS,
                HOME_READ_ALL_FAILURE
            ],
            endpoint: `/api/admin/allHome`,
            method: 'GET'
        },
    }
}