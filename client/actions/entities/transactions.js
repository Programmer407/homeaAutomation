// libs

// src
import { CALL_API } from '../../middleware/api'

export const TRANSACTION_DATA = 'TRANSACTION_DATA'
export const TRANSACTION_DATA_SUCCESS = 'TRANSACTION_DATA_SUCCESS'
export const TRANSACTION_DATA_FAILURE = 'TRANSACTION_DATA_FAILURE'

export function transactionsData(transType) {
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
    payload: {transType}
  }
}