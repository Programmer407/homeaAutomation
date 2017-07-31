import * as ActionTypes from '../../actions'
import { mergeNewEntities, ENTITY_STATUS_DATA_AVAILABLE } from '../../utils'

export default function users(state = {}, action) {
  switch (action.type) {
  case ActionTypes.USER_LOGIN: {
    return {...state, isLoading: true}
  }
  case ActionTypes.USER_LOGIN_SUCCESS: {
		const {payload} = action;
		const {user} = payload;
		if (!payload) {
      throw new Error(`Can't execute ${ ActionTypes.USER_LOGIN_SUCCESS }. {payload} isn't available in action`)
    }

		return {...state, user, isLoading: false}
    /* const { payload: { user } } = action
    return mergeNewEntities(state, [user], ENTITY_STATUS_DATA_AVAILABLE) */
  }
  case ActionTypes.USER_LOGIN_FAILURE: {
    return {...state, isLoading: false}
  }
  /*case ActionTypes.USER_REGISTER_SUCCESS: {
    if (!action.payload) {
      throw new Error(`Can't execute ${ ActionTypes.USER_REGISTER_SUCCESS }. {payload} isn't available in action`)
    }

    const { payload: { user } } = action

    return mergeNewEntities(state, [user], ENTITY_STATUS_DATA_AVAILABLE)
  }*/
  default: {
    return state
  }
  }
}
