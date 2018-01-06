// libs
import { push } from 'react-router-redux'

// src
import { CALL_API } from '../../middleware/api'



export const PALACE_ADD = 'PALACE_ADD'
export const PALACE_ADD_SUCCESS = 'PALACE_ADD_SUCCESS'
export const PALACE_ADD_FAILURE = 'PALACE_ADD_FAILURE'

export function addPalace(homeName,floorName,palaceType,palaceName) {
    console.log("add home action has been called")
    return {
        [CALL_API]: {
            types: [
                PALACE_ADD,
                PALACE_ADD_SUCCESS,
                PALACE_ADD_FAILURE
            ],
            /* endpoint: `/api/palace/add`,*/
            method: 'POST'
        },
        payload: {homeName, floorName, palaceType,palaceName}
    }
}