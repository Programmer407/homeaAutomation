// libs
import { push } from 'react-router-redux'

// src
import { CALL_API } from '../../middleware/api'



export const ADD_APPLIANCE = 'ADD_APPLIANCE'
export const ADD_APPLIANCE_SUCCESS = 'ADD_APPLIANCE_SUCCESS'
export const ADD_APPLIANCE_FAILURE = 'ADD_APPLIANCE_FAILURE'

export function addAppliance(applianceName) {
    console.log("Add appliance  action has been called")
    return {
        [CALL_API]: {
            types: [
                ADD_APPLIANCE,
                ADD_APPLIANCE_SUCCESS,
                ADD_APPLIANCE_FAILURE
            ],
           /* endpoint: `/api/addAppliance`,*/
            method: 'GET'
        },
        payload: {applianceName}
    }
}