// libs
import { push } from 'react-router-redux'

// src
import { CALL_API } from '../../middleware/api'

export const MYACCOUNT_LIST = 'MYACCOUNT_LIST'
export const MYACCOUNT_LIST_SUCCESS = 'MYACCOUNT_LIST_SUCCESS'
export const MYACCOUNT_LIST_FAILURE = 'MYACCOUNT_LIST_FAILURE'

export function myaccountlist() {
    console.log('myaccountList')
  return {
    [CALL_API]: {
      types: [
        MYACCOUNT_LIST,
        MYACCOUNT_LIST_SUCCESS,
        MYACCOUNT_LIST_FAILURE
      ],
      endpoint: `/api/accounts/my-account-list`,
      method: 'GET'
    }
  }
}

export const MYACCOUNT_CONNECT = 'MYACCOUNT_CONNECT'
export const MYACCOUNT_CONNECT_SUCCESS = 'MYACCOUNT_CONNECT_SUCCESS'
export const MYACCOUNT_CONNECT_FAILURE = 'MYACCOUNT_CONNECT_FAILURE'

export function myaccountconnect() {
  return {
    [CALL_API]: {
      types: [
        MYACCOUNT_CONNECT,
        MYACCOUNT_CONNECT_SUCCESS,
        MYACCOUNT_CONNECT_FAILURE
      ],
      endpoint: `/api/accounts/my-account-connect`
    }
  }
}

export const COINBASE_CODE_CONNECT = 'COINBASE_CODE_CONNECT'
export const COINBASE_CODE_CONNECT_SUCCESS = 'COINBASE_CODE_CONNECT_SUCCESS'
export const COINBASE_CODE_CONNECT_FAILURE = 'COINBASE_CODE_CONNECT_FAILURE'

export function authenticateCoinBase(code) {
  console.log('authenticateCoinBase called.')
  let grant_type = 'authorization_code'
  let client_id = '45a38875c5f7a2563c36cf347ebef69d428bbee77d6d9ece0878f1f54fb92f78'
  let client_secret = 'bbdb10e9e75699e9b865d553bfc82be6d4c05f64db988026ca82e33e44c780c0'
  let redirect_uri = encodeURIComponent('http://localhost/account/coinbase/callback2')
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
    payload: {grant_type, code, client_id, client_secret, redirect_uri}
  }
}