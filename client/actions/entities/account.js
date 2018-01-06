// libs
import { push } from 'react-router-redux'

// src
import { CALL_API } from '../../middleware/api'



export const ACCOUNT_CREATE = 'ACCOUNT_CREATE'
export const ACCOUNT_CREATE_SUCCESS = 'ACCOUNT_CREATE_SUCCESS'
export const ACCOUNT_CREATE_FAILURE = 'ACCOUNT_CREATE_FAILURE'

export function accountCreate() {
    console.log("account create d action has been called")
    return {
        [CALL_API]: {
            types: [
                ACCOUNT_CREATE,
                ACCOUNT_CREATE_SUCCESS,
                ACCOUNT_CREATE_FAILURE
            ],
          /* endpoint: `/api/accout/create`,*/
            method: 'GET'
        },
    }
}