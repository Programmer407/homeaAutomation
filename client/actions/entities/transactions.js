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

export const DELETE_TRANSACTION = 'DELETE_TRANSACTION'
export const DELETE_TRANSACTION_SUCCESS = 'DELETE_TRANSACTION_SUCCESS'
export const DELETE_TRANSACTION_FAILURE = 'DELETE_TRANSACTION_FAILURE'

export function deleteTransaction(transactionIds, listingParameters) {
  return {
    [CALL_API]: {
      types: [
        DELETE_TRANSACTION,
        DELETE_TRANSACTION_SUCCESS,
        DELETE_TRANSACTION_FAILURE
      ],
      endpoint: `/api/transactions/delete-transaction`,
      method: 'POST'
    },
    payload: {transactionIds, listingParameters}
  }
}

export const UPDATE_TRANSACTION = 'UPDATE_TRANSACTION'
export const UPDATE_TRANSACTION_SUCCESS = 'UPDATE_TRANSACTION_SUCCESS'
export const UPDATE_TRANSACTION_FAILURE = 'UPDATE_TRANSACTION_FAILURE'

export function updateTransaction(trxData) {
  return {
    [CALL_API]: {
      types: [
        UPDATE_TRANSACTION,
        UPDATE_TRANSACTION_SUCCESS,
        UPDATE_TRANSACTION_FAILURE
      ],
      endpoint: `/api/transactions/update-transaction`,
      method: 'POST'
    },
    payload: {trxData}
  }
}

export const UPDATE_TRANSACTIONS_TYPE = 'UPDATE_TRANSACTIONS_TYPE'
export const UPDATE_TRANSACTIONS_TYPE_SUCCESS = 'UPDATE_TRANSACTIONS_TYPE_SUCCESS'
export const UPDATE_TRANSACTIONS_TYPE_FAILURE = 'UPDATE_TRANSACTIONS_TYPE_FAILURE'

export function updateTransactionsType(transactionIds, selectedTrxTypeId, listingParameters) {
  return {
    [CALL_API]: {
      types: [
        UPDATE_TRANSACTIONS_TYPE,
        UPDATE_TRANSACTIONS_TYPE_SUCCESS,
        UPDATE_TRANSACTIONS_TYPE_FAILURE
      ],
      endpoint: `/api/transactions/update-transactions-type`,
      method: 'POST'
    },
    payload: {transactionIds, selectedTrxTypeId, listingParameters}
  }
}
