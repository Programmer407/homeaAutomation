// libs
import { push } from 'react-router-redux'

// src
import { CALL_API } from '../../middleware/api'

export const MYACCOUNT_DATA = 'MYACCOUNT_DATA'
export const MYACCOUNT_DATA_SUCCESS = 'MYACCOUNT_DATA_SUCCESS'
export const MYACCOUNT_DATA_FAILURE = 'MYACCOUNT_DATA_FAILURE'

export function myAccountData() {
  return {
    [CALL_API]: {
      types: [
        MYACCOUNT_DATA,
        MYACCOUNT_DATA_SUCCESS,
        MYACCOUNT_DATA_FAILURE
      ],
      endpoint: `/api/accounts/my-account-all-data`
    }
  }
}

export const MYACCOUNT_CONNECT = 'MYACCOUNT_CONNECT'
export const MYACCOUNT_CONNECT_SUCCESS = 'MYACCOUNT_CONNECT_SUCCESS'
export const MYACCOUNT_CONNECT_FAILURE = 'MYACCOUNT_CONNECT_FAILURE'

export function accountconnectUrl(providerId) {
  return {
    [CALL_API]: {
      types: [
        MYACCOUNT_CONNECT,
        MYACCOUNT_CONNECT_SUCCESS,
        MYACCOUNT_CONNECT_FAILURE
      ],
      endpoint: `/api/accounts/my-account-connect-url`,
      method: 'POST'
    },
    payload: {providerId}
  }
}

export const PROVIDER_CALLBACK = 'PROVIDER_CALLBACK'
export const PROVIDER_CALLBACK_SUCCESS = 'PROVIDER_CALLBACK_SUCCESS'
export const PROVIDER_CALLBACK_FAILURE = 'PROVIDER_CALLBACK_FAILURE'

export function providerCallback(providerName, tokenCode) {
  return {
    [CALL_API]: {
      types: [
        PROVIDER_CALLBACK,
        PROVIDER_CALLBACK_SUCCESS,
        PROVIDER_CALLBACK_FAILURE
      ],
      endpoint: `/api/accounts/wallet-provider-callback`,
      method: 'POST'
    },
    payload: {providerName, tokenCode}
  }
}

export const DELETE_WALLET = 'DELETE_WALLET'
export const DELETE_WALLET_SUCCESS = 'DELETE_WALLET_SUCCESS'
export const DELETE_WALLET_FAILURE = 'DELETE_WALLET_FAILURE'

export function deleteWallet(userWalletId) {
  return {
    [CALL_API]: {
      types: [
        DELETE_WALLET,
        DELETE_WALLET_SUCCESS,
        DELETE_WALLET_FAILURE
      ],
      endpoint: `/api/accounts/delete-userprovider-wallet`,
      method: 'POST'
    },
    payload: {userWalletId}
  }
}

export const REFRESH_USERPROVIDERS = 'REFRESH_USERPROVIDERS'
export const REFRESH_USERPROVIDERS_SUCCESS = 'REFRESH_USERPROVIDERS_SUCCESS'
export const REFRESH_USERPROVIDERS_FAILURE = 'REFRESH_USERPROVIDERS_FAILURE'

export function refreshUserProviders(userProviderId) {
  return {
    [CALL_API]: {
      types: [
        REFRESH_USERPROVIDERS,
        REFRESH_USERPROVIDERS_SUCCESS,
        REFRESH_USERPROVIDERS_FAILURE
      ],
      endpoint: `/api/accounts/refresh-userproviders`,
      method: 'POST'
    },
    payload: {userProviderId}
  }
}

export const ADD_USER_ADDRESSES = 'ADD_USER_ADDRESSES'
export const ADD_USER_ADDRESSES_SUCCESS = 'ADD_USER_ADDRESSES_SUCCESS'
export const ADD_USER_ADDRESSES_FAILURE = 'ADD_USER_ADDRESSES_FAILURE'

export function addUserAddresses(coinAddresses) {
  return {
    [CALL_API]: {
      types: [
        ADD_USER_ADDRESSES,
        ADD_USER_ADDRESSES_SUCCESS,
        ADD_USER_ADDRESSES_FAILURE
      ],
      endpoint: `/api/accounts/user-addresses-insert`,
      method: 'POST'
    },
    payload: { coinAddresses }
  }
}

export const REFRESH_USER_ADDRESSES = 'REFRESH_USER_ADDRESSES'
export const REFRESH_USER_ADDRESSES_SUCCESS = 'REFRESH_USER_ADDRESSES_SUCCESS'
export const REFRESH_USER_ADDRESSES_FAILURE = 'REFRESH_USER_ADDRESSES_FAILURE'

export function refreshUserAddresses(userAddressId) {
  return {
    [CALL_API]: {
      types: [
        REFRESH_USER_ADDRESSES,
        REFRESH_USER_ADDRESSES_SUCCESS,
        REFRESH_USER_ADDRESSES_FAILURE
      ],
      endpoint: `/api/accounts/user-addresses-refresh`,
      method: 'POST'
    },
    payload: { userAddressId }
  }
}

export const DELETE_USER_ADDRESS = 'DELETE_USER_ADDRESS'
export const DELETE_USER_ADDRESS_SUCCESS = 'DELETE_USER_ADDRESS_SUCCESS'
export const DELETE_USER_ADDRESS_FAILURE = 'DELETE_USER_ADDRESS_FAILURE'

export function deleteUserAddress(userAddressId) {
  return {
    [CALL_API]: {
      types: [
        DELETE_USER_ADDRESS,
        DELETE_USER_ADDRESS_SUCCESS,
        DELETE_USER_ADDRESS_FAILURE
      ],
      endpoint: `/api/accounts/user-address-delete`,
      method: 'POST'
    },
    payload: { userAddressId }
  }
}

export const UPDATE_USER_ADDRESS = 'UPDATE_USER_ADDRESS'
export const UPDATE_USER_ADDRESS_SUCCESS = 'UPDATE_USER_ADDRESS_SUCCESS'
export const UPDATE_USER_ADDRESS_FAILURE = 'UPDATE_USER_ADDRESS_FAILURE'

export function updateUserAddress(userAddressId, userAddressNickName) {
  return {
    [CALL_API]: {
      types: [
        UPDATE_USER_ADDRESS,
        UPDATE_USER_ADDRESS_SUCCESS,
        UPDATE_USER_ADDRESS_FAILURE
      ],
      endpoint: `/api/accounts/user-address-update`,
      method: 'POST'
    },
    payload: { userAddressId, userAddressNickName }
  }
}

export const UPDATE_ASSOCIATED_MYADD = 'UPDATE_ASSOCIATED_MYADD'
export const UPDATE_ASSOCIATED_MYADD_SUCCESS = 'UPDATE_ASSOCIATED_MYADD_SUCCESS'
export const UPDATE_ASSOCIATED_MYADD_FAILURE = 'UPDATE_ASSOCIATED_MYADD_FAILURE'

export function updateAssociatedMyAdd(associatedAddId, associatedAddNick) {
  return {
    [CALL_API]: {
      types: [
        UPDATE_ASSOCIATED_MYADD,
        UPDATE_ASSOCIATED_MYADD_SUCCESS,
        UPDATE_ASSOCIATED_MYADD_FAILURE
      ],
      endpoint: `/api/accounts/associated-myaddress-update`,
      method: 'POST'
    },
    payload: { associatedAddId, associatedAddNick }
  }
}

export const UPDATE_ASSOCIATED_WALLETADD = 'UPDATE_ASSOCIATED_WALLETADD'
export const UPDATE_ASSOCIATED_WALLETADD_SUCCESS = 'UPDATE_ASSOCIATED_WALLETADD_SUCCESS'
export const UPDATE_ASSOCIATED_WALLETADD_FAILURE = 'UPDATE_ASSOCIATED_WALLETADD_FAILURE'

export function updateAssociatedWalletAdd(associatedAddId, associatedAddNick) {
  return {
    [CALL_API]: {
      types: [
        UPDATE_ASSOCIATED_WALLETADD,
        UPDATE_ASSOCIATED_WALLETADD_SUCCESS,
        UPDATE_ASSOCIATED_WALLETADD_FAILURE
      ],
      endpoint: `/api/accounts/associated-walletaddress-update`,
      method: 'POST'
    },
    payload: { associatedAddId, associatedAddNick }
  }
}