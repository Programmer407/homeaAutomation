import * as ActionTypes from '../../actions'
import { mergeNewEntities, ENTITY_STATUS_DATA_AVAILABLE } from '../../utils'

export default function accounts(state = {}, action) {
  switch (action.type) {
    case ActionTypes.MYACCOUNT_LIST_SUCCESS: {
      if (!action.payload) {
        throw new Error(`Can't execute ${ ActionTypes.MYACCOUNT_LIST_SUCCESS }. {payload} isn't available in action`)
      }

      const { payload: { user } } = action

      return mergeNewEntities(state, [user], ENTITY_STATUS_DATA_AVAILABLE)
    }

		case ActionTypes.GET_ALL_PROVIDERS_SUCCESS: {
			const {payload} = action;
			const {providerList} = payload;
      if (!payload) {
        throw new Error(`Can't execute ${ ActionTypes.GET_ALL_PROVIDERS_SUCCESS }. {payload} isn't available in action`)
      }
			
			return {...state, providerList};
    }

		case ActionTypes.USERPROVIDER_LIST_SUCCESS: {
			const {payload} = action;
			const {userProviderList} = payload;
      if (!payload) {
        throw new Error(`Can't execute ${ ActionTypes.USERPROVIDER_LIST_SUCCESS }. {payload} isn't available in action`)
      }
			
			return {...state, userProviderList};
    }

		case ActionTypes.USERADDRESSES_LIST_SUCCESS: {
			const {payload} = action;
			const {userAddressesList} = payload;
      if (!payload) {
        throw new Error(`Can't execute ${ ActionTypes.USERPROVIDER_LIST_SUCCESS }. {payload} isn't available in action`)
      }
			
			return {...state, userAddressesList};
    }

		case ActionTypes.ADD_USER_ADDRESSES_SUCCESS: {
			const {payload} = action;
			const {userAddressesList} = payload;
      if (!payload) {
        throw new Error(`Can't execute ${ ActionTypes.ADD_USER_ADDRESSES_SUCCESS }. {payload} isn't available in action`)
      }
			
			return {...state, userAddressesList};
    }

		case ActionTypes.REFRESH_USER_ADDRESSES_SUCCESS: {
			const {payload} = action;
			const {userAddressesList} = payload;
      if (!payload) {
        throw new Error(`Can't execute ${ ActionTypes.REFRESH_USER_ADDRESSES_SUCCESS }. {payload} isn't available in action`)
      }
			
			return {...state, userAddressesList};
    }

    default: {
      return state
    }
  }
}
