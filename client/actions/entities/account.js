// libs
import { push } from 'react-router-redux'

// src
import { CALL_API } from '../../middleware/api'



export const ACCOUNT_CREATE = 'ACCOUNT_CREATE'
export const ACCOUNT_CREATE_SUCCESS = 'ACCOUNT_CREATE_SUCCESS'
export const ACCOUNT_CREATE_FAILURE = 'ACCOUNT_CREATE_FAILURE'

export function accountCreate(status) {
    console.log("account create d action has been called")
    return {
        [CALL_API]: {
            types: [
                ACCOUNT_CREATE,
                ACCOUNT_CREATE_SUCCESS,
                ACCOUNT_CREATE_FAILURE
            ],
          endpoint: `/api/admin/addAccount`,
            method: 'POST'
        },
        payload : {status}
    }
}

export const ACCOUNT_READ_ALL = 'ACCOUNT_READ_ALL'
export const ACCOUNT_READ_ALL_SUCCESS = 'ACCOUNT_READ_ALL_SUCCESS'
export const ACCOUNT_READ_ALL_FAILURE = 'ACCOUNT_READ_ALL_FAILURE'

export function getAllAccounts() {
    console.log("get All account action has been called")
    return {
        [CALL_API]: {
            types: [
                ACCOUNT_READ_ALL,
                ACCOUNT_READ_ALL_SUCCESS,
                ACCOUNT_READ_ALL_FAILURE
            ],
            endpoint: `/api/admin/allAccount`,
            method: 'GET'
        },
    }
}