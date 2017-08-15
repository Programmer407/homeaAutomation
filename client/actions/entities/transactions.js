// libs

// src
import { CALL_API } from '../../middleware/api'

export const TRANSACTION_DATA = 'TRANSACTION_DATA'
export const TRANSACTION_DATA_SUCCESS = 'TRANSACTION_DATA_SUCCESS'
export const TRANSACTION_DATA_FAILURE = 'TRANSACTION_DATA_FAILURE'

export function transactionsData(listingParameters) {
  return {
    [CALL_API]: {
      types: [
        TRANSACTION_DATA,
        TRANSACTION_DATA_SUCCESS,
        TRANSACTION_DATA_FAILURE
      ],
      endpoint: `/api/transactions/transaction-data`,
      method: 'POST'
    },
    payload: {listingParameters}
  }
}

export const INSERT_TRANSACTION = 'INSERT_TRANSACTION'
export const INSERT_TRANSACTION_SUCCESS = 'INSERT_TRANSACTION_SUCCESS'
export const INSERT_TRANSACTION_FAILURE = 'INSERT_TRANSACTION_FAILURE'

export function insertTransaction(trxData) {
  return {
    [CALL_API]: {
      types: [
        INSERT_TRANSACTION,
        INSERT_TRANSACTION_SUCCESS,
        INSERT_TRANSACTION_FAILURE
      ],
      endpoint: `/api/transactions/insert-transaction`,
      method: 'POST'
    },
    payload: {trxData}
  }
}