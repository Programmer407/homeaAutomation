import * as ActionTypes from '../../actions'

export default function accounts(state = {}, action) {
  switch (action.type) {
/*****************************************myAccountData*****************************************************************/ 
    case ActionTypes.MYACCOUNT_DATA_SUCCESS: {
      const {payload} = action;
      const {providerList, userProviderList, userAddressesList} = payload;
      if (!payload) {
        throw new Error(`Can't execute ${ ActionTypes.GET_ALL_PROVIDERS_SUCCESS }. {payload} isn't available in action`)
      }
			return {...state, providerList, userProviderList, userAddressesList};
    }

/*****************************************deleteWallet*****************************************************************/ 
		case ActionTypes.DELETE_WALLET: {
			return {...state, deleteUserWalletList: true}
    }
    case ActionTypes.DELETE_WALLET_SUCCESS: {
			const {payload} = action;
			const {userProviderList} = payload;
      if (!payload) {
        throw new Error(`Can't execute ${ ActionTypes.DELETE_WALLET_SUCCESS }. {payload} isn't available in action`)
      }
			return {...state, userProviderList, deleteUserWalletList: false};
    }
		case ActionTypes.DELETE_WALLET_FAILURE: {
			return {...state, deleteUserWalletList: false}
    }
/*****************************************refreshUserProviders*****************************************************************/ 
		case ActionTypes.REFRESH_USERPROVIDERS: {
			return {...state, refreshUserWalletList: true}
    }
    case ActionTypes.REFRESH_USERPROVIDERS_SUCCESS: {
			const {payload} = action;
			const {userProviderList} = payload;
      if (!payload) {
        throw new Error(`Can't execute ${ ActionTypes.REFRESH_USERPROVIDERS_SUCCESS }. {payload} isn't available in action`)
      }
			return {...state, userProviderList, refreshUserWalletList: false};
    }
		case ActionTypes.REFRESH_USERPROVIDERS_FAILURE: {
			return {...state, refreshUserWalletList: false}
    }
/*****************************************updateAssociatedWalletAdd*****************************************************************/ 
		case ActionTypes.UPDATE_ASSOCIATED_WALLETADD: {
			return {...state, refreshUserWalletList: true}
    }
    case ActionTypes.UPDATE_ASSOCIATED_WALLETADD_SUCCESS: {
			const {payload} = action;
			const {userProviderList} = payload;
      if (!payload) {
        throw new Error(`Can't execute ${ ActionTypes.UPDATE_ASSOCIATED_WALLETADD_SUCCESS }. {payload} isn't available in action`)
      }
			return {...state, userProviderList, refreshUserWalletList: false};
    }
		case ActionTypes.UPDATE_ASSOCIATED_WALLETADD_FAILURE: {
			return {...state, refreshUserWalletList: false}
    }
/*****************************************addUserAddresses*****************************************************************/ 
		case ActionTypes.ADD_USER_ADDRESSES: {
			return {...state, addUserAddressList: true}
    }
    case ActionTypes.ADD_USER_ADDRESSES_SUCCESS: {
			const {payload} = action;
			const {userAddressesList} = payload;
      if (!payload) {
        throw new Error(`Can't execute ${ ActionTypes.ADD_USER_ADDRESSES_SUCCESS }. {payload} isn't available in action`)
      }
			return {...state, userAddressesList, addUserAddressList: false};
    }
		case ActionTypes.ADD_USER_ADDRESSES_FAILURE: {
			return {...state, addUserAddressList: false}
    }
/****************************************refreshUserAddresses******************************************************************/    
    case ActionTypes.REFRESH_USER_ADDRESSES: {
			return {...state, refreshUserAddressList: true}
    }
    case ActionTypes.REFRESH_USER_ADDRESSES_SUCCESS: {
			const {payload} = action;
			const {userAddressesList} = payload;
      if (!payload) {
        throw new Error(`Can't execute ${ ActionTypes.REFRESH_USER_ADDRESSES_SUCCESS }. {payload} isn't available in action`)
      }
			return {...state, userAddressesList, refreshUserAddressList: false};
    }
		case ActionTypes.REFRESH_USER_ADDRESSES_FAILURE: {
			return {...state, refreshUserAddressList: false}
    }
/**************************************deleteUserAddress********************************************************************/     
		case ActionTypes.DELETE_USER_ADDRESS: {
			return {...state, deleteUserAddressList: true}
    }
    case ActionTypes.DELETE_USER_ADDRESS_SUCCESS: {
			const {payload} = action;
			const {userAddressesList} = payload;
      if (!payload) {
        throw new Error(`Can't execute ${ ActionTypes.DELETE_USER_ADDRESS_SUCCESS }. {payload} isn't available in action`)
      }
			return {...state, userAddressesList, deleteUserAddressList: false};
    }
    case ActionTypes.DELETE_USER_ADDRESS_FAILURE: {
			return {...state, deleteUserAddressList: false}
    }
/**************************************updateUserAddress********************************************************************/     
		case ActionTypes.UPDATE_USER_ADDRESS: {
			return {...state, updateUserAddressList: true}
    }
    case ActionTypes.UPDATE_USER_ADDRESS_SUCCESS: {
			const {payload} = action;
			const {userAddressesList} = payload;
      if (!payload) {
        throw new Error(`Can't execute ${ ActionTypes.UPDATE_USER_ADDRESS_SUCCESS }. {payload} isn't available in action`)
      }
			return {...state, userAddressesList, updateUserAddressList: false};
    }
    case ActionTypes.UPDATE_USER_ADDRESS_FAILURE: {
			return {...state, updateUserAddressList: false}
    }
/**************************************updateAssociatedMyAdd********************************************************************/     
		case ActionTypes.UPDATE_ASSOCIATED_MYADD: {
			return {...state, refreshUserAddressList: true}
    }
    case ActionTypes.UPDATE_ASSOCIATED_MYADD_SUCCESS: {
			const {payload} = action;
			const {userAddressesList} = payload;
      if (!payload) {
        throw new Error(`Can't execute ${ ActionTypes.UPDATE_ASSOCIATED_MYADD_SUCCESS }. {payload} isn't available in action`)
      }
			return {...state, userAddressesList, refreshUserAddressList: false};
    }
    case ActionTypes.UPDATE_ASSOCIATED_MYADD_FAILURE: {
			return {...state, refreshUserAddressList: false}
    }
/**************************************default********************************************************************/     
    default: {
      return state
    }
  }
}


