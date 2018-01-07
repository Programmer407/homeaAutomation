// libs
import { push } from 'react-router-redux'

// src
import { CALL_API } from '../../middleware/api'



export const APPLIANCE_ADD = 'APPLIANCE_ADD'
export const APPLIANCE_ADD_SUCCESS = 'APPLIANCE_ADD_SUCCESS'
export const APPLIANCE_ADD_FAILURE = 'APPLIANCE_ADD_FAILURE'

export function addAppliance(homeId,floorId,palaceId,applianceType,name) {
    console.log("Add appliance  action has been called")
    return {
        [CALL_API]: {
            types: [
                APPLIANCE_ADD,
                APPLIANCE_ADD_SUCCESS,
                APPLIANCE_ADD_FAILURE
            ],
            endpoint: `/api/admin/addSwitch`,
            method: 'POST'
        },
        payload: { name,applianceType,palaceId,floorId,homeId}
    }
}

