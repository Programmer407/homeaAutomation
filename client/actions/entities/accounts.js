// libs
import { push } from 'react-router-redux'

// src
import { CALL_API } from '../../middleware/api'

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

export const MYACCOUNT_PROVIDERINFO = 'MYACCOUNT_PROVIDERINFO'
export const MYACCOUNT_PROVIDERINFO_SUCCESS = 'MYACCOUNT_PROVIDERINFO_SUCCESS'
export const MYACCOUNT_PROVIDERINFO_FAILURE = 'MYACCOUNT_PROVIDERINFO_FAILURE'

export function providerInfo(providerName) {
  return {
    [CALL_API]: {
      types: [
        MYACCOUNT_PROVIDERINFO,
        MYACCOUNT_PROVIDERINFO_SUCCESS,
        MYACCOUNT_PROVIDERINFO_FAILURE
      ],
      endpoint: `/api/accounts/my-account-provider-info`,
      method: 'POST'
    },
    payload: {providerName}
  }
}

export const COINBASE_CODE_CONNECT = 'COINBASE_CODE_CONNECT'
export const COINBASE_CODE_CONNECT_SUCCESS = 'COINBASE_CODE_CONNECT_SUCCESS'
export const COINBASE_CODE_CONNECT_FAILURE = 'COINBASE_CODE_CONNECT_FAILURE'

export function authenticateCoinBaseApi(code, grant_type, client_id, client_secret) {
  //let redirect_uri = 'http://localhost/account/coinbase/callback'
  let redirect_uri = 'http://ec2-54-193-61-55.us-west-1.compute.amazonaws.com/account/coinbase/callback'
  return {
    [CALL_API]: {
      types: [
        COINBASE_CODE_CONNECT,
        COINBASE_CODE_CONNECT_SUCCESS,
        COINBASE_CODE_CONNECT_FAILURE
      ],
      endpoint: `https://api.coinbase.com/oauth/token`,
      method: 'POST'
    },
    payload: {code, grant_type, client_id, client_secret, redirect_uri}
  }
}

export const INSERT_USER_PROVIDER = 'INSERT_USER_PROVIDER'
export const INSERT_USER_PROVIDER_SUCCESS = 'INSERT_USER_PROVIDER_SUCCESS'
export const INSERT_USER_PROVIDER_FAILURE = 'INSERT_USER_PROVIDER_FAILURE'

export function insertUserProvider(accessToken, refreshToken, providerId) {
  return {
    [CALL_API]: {
      types: [
        INSERT_USER_PROVIDER,
        INSERT_USER_PROVIDER_SUCCESS,
        INSERT_USER_PROVIDER_FAILURE
      ],
      endpoint: `/api/accounts/insert-userprovider`,
      method: 'POST'
    },
    payload: {accessToken, refreshToken, providerId}
  }
}

export const USERPROVIDER_WALLET = 'USERPROVIDER_WALLET'
export const USERPROVIDER_WALLET_SUCCESS = 'USERPROVIDER_WALLET_SUCCESS'
export const USERPROVIDER_WALLET_FAILURE = 'USERPROVIDER_WALLET_FAILURE'

export function userProviderWallets(userProviderId) {
  return {
    [CALL_API]: {
      types: [
        USERPROVIDER_WALLET,
        USERPROVIDER_WALLET_SUCCESS,
        USERPROVIDER_WALLET_FAILURE
      ],
      endpoint: `/api/accounts/update-userprovider-wallets`,
      method: 'POST'
    },
    payload: {userProviderId}
  }
}

export const USERPROVIDER_LIST = 'USERPROVIDER_LIST'
export const USERPROVIDER_LIST_SUCCESS = 'USERPROVIDER_LIST_SUCCESS'
export const USERPROVIDER_LIST_FAILURE = 'USERPROVIDER_LIST_FAILURE'

export function userProvidersList() {
  return {
    [CALL_API]: {
      types: [
        USERPROVIDER_LIST,
        USERPROVIDER_LIST_SUCCESS,
        USERPROVIDER_LIST_FAILURE
      ],
      endpoint: `/api/accounts/my-account-all-userwallets`
    }
  }
}

export const GET_ALL_PROVIDERS = 'GET_ALL_PROVIDERS'
export const GET_ALL_PROVIDERS_SUCCESS = 'GET_ALL_PROVIDERS_SUCCESS'
export const GET_ALL_PROVIDERS_FAILURE = 'GET_ALL_PROVIDERS_FAILURE'

export function getAllProviders() {
  return {
    [CALL_API]: {
      types: [
        GET_ALL_PROVIDERS,
        GET_ALL_PROVIDERS_SUCCESS,
        GET_ALL_PROVIDERS_FAILURE
      ],
      endpoint: `/api/accounts/my-account-all-providers`
    }
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

export function refreshUserProviders() {
  return {
    [CALL_API]: {
      types: [
        REFRESH_USERPROVIDERS,
        REFRESH_USERPROVIDERS_SUCCESS,
        REFRESH_USERPROVIDERS_FAILURE
      ],
      endpoint: `/api/accounts/refresh-userproviders`
    }
  }
}