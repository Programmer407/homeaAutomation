// libs
import express from 'express'
import WAValidator from 'wallet-address-validator'
import moment from 'moment'
import async from 'async'

// src
import Transaction from './../../models/Transaction'
import { ensureAuthorization, rejectRequest } from '../../utils'
import { findTransactionsByUserId, findTransactionsBySearchText, deleteTransactionById, updateTransaction, findTransactionById } from '../../managers/transactionManager'
import { findTransactionTypeById } from '../../managers/transactionTypeManager'
import { findTrxImportTypeById } from '../../managers/transactionImportManager'
import { findAssociatedAddByAdd, updateAssociatedAdd } from '../../managers/associatedAddressManager'

const router = express.Router()

router.post('/api/transactions/transaction-data', ensureAuthorization, (req, res) => {
  console.log('/api/transactions/transaction-data called.')
  const { body, user } = req
  if ( !body ) {
  	rejectRequest('Missing request body', res)
    return
  }

  const { listingParameters } = body
  if ( !listingParameters ) {
  	rejectRequest('Missing required arguments', res)
  	return
  }

  let trxType = 'Sale'
  if (listingParameters.trxType)
    trxType = listingParameters.trxType

  let searchParam = ''
  if (listingParameters.queryString)
    searchParam = listingParameters.queryString

  if (searchParam) {
    findTransactionsBySearchText(user.id, trxType, searchParam)
    .then(transactionList => {
      res
        .status(200)
        .send({
          transactionList,
          trxType
        })
    })
  } else {
    findTransactionsByUserId(user.id, trxType)
    .then(transactionList => {
      res
        .status(200)
        .send({
          transactionList,
          trxType
        })
    })
  }
})

router.post('/api/transactions/insert-transaction', ensureAuthorization, (req, res) => {
  console.log('/api/transactions/insert-transaction')
  const { body, user } = req
  if ( !body ) {
  	rejectRequest('Missing request body', res)
    return
  }

  const { trxData } = body
  if ( !trxData ) {
  	rejectRequest('Missing required arguments', res)
  	return
  }

  const { transactionDate, destination, note, amount, asset, value, transactionTypeId } = trxData
  const trx_date = new Date(transactionDate)
  const moment_date = moment(trx_date).format("YYYY-MM-DD HH:MM:SS")

  const transactionObj = Transaction.build({destination: destination, note: note, transactionDate: moment_date, amount: amount, asset: asset, value: value})
  transactionObj.setUser(user, {save: false})
  findTransactionTypeById(transactionTypeId)
  .then(transactionTypeObj => {
    transactionObj.setTransactiontype(transactionTypeObj, {save: false})
    findTrxImportTypeById(4)
    .then(trxImportTypeObj => {
      transactionObj.setTransactionimporttype(trxImportTypeObj, {save: false})
      if (WAValidator.validate(destination)) {
        findAssociatedAddByAdd(destination)
        .then(associatedAddObj => {
          if (associatedAddObj) {
            transactionObj.setAssociatedaddress(associatedAddObj, {save: false})
            updateTransaction(transactionObj)
            .then(updatedTransaction => {
              findTransactionsByUserId(user.id, transactionTypeObj.typeName)
              .then(transactionList => {
                res
                  .status(200)
                  .send({
                    transactionList
                  })
              })
            })
          } else {
            associatedAddObj = AssociatedAddress.build({address: destination, nickName: destination})
            updateAssociatedAdd(associatedAddObj)
            .then(updatedAssociatedAdd => {
              transactionObj.setAssociatedaddress(updatedAssociatedAdd, {save: false})
              updateTransaction(transactionObj)
              .then(updatedTransaction => {
                findTransactionsByUserId(user.id, transactionTypeObj.typeName)
                .then(transactionList => {
                  res
                    .status(200)
                    .send({
                      transactionList
                    })
                })
              })
            })
          }
        })
      } else {
        updateTransaction(transactionObj)
        .then(updatedTransaction => {
          findTransactionsByUserId(user.id, transactionTypeObj.typeName)
          .then(transactionList => {
            res
              .status(200)
              .send({
                transactionList
              })
          })
        })
      }
    })
  })
})

router.post('/api/transactions/update-transaction', ensureAuthorization, (req, res) => {
  console.log('/api/transactions/-transaction')
  const { body, user } = req
  if ( !body ) {
  	rejectRequest('Missing request body', res)
    return
  }

  const { trxData } = body
  if ( !trxData ) {
  	rejectRequest('Missing required arguments', res)
  	return
  }

  const { transactionId, transactionDate, destination, note, amount, asset, value, transactionTypeId } = trxData
  if ( !transactionId || !transactionDate || !destination || !note || !amount || !asset || !value || !transactionTypeId ) {
  	rejectRequest('Missing required arguments', res)
  	return
  }

  findTransactionById(transactionId)
  .then(transactionObj => {
    transactionObj.destination = destination

    const trx_date = new Date(transactionDate)
    const moment_date = moment(trx_date).format("YYYY-MM-DD HH:MM:SS")
    transactionObj.transactionDate = moment_date

    transactionObj.amount = amount
    transactionObj.asset = asset
    transactionObj.value = value
    findTransactionTypeById(transactionTypeId)
    .then(transactionTypeObj => {
      transactionObj.setTransactiontype(transactionTypeObj, {save: false})
      if (WAValidator.validate(destination)) {
        findAssociatedAddByAdd(destination)
        .then(associatedAddObj => {
          if (associatedAddObj) {
            transactionObj.setAssociatedaddress(associatedAddObj, {save: false})
            updateTransaction(transactionObj)
            .then(updatedTransaction => {
              findTransactionsByUserId(user.id, transactionTypeObj.typeName)
              .then(transactionList => {
                res
                  .status(200)
                  .send({
                    transactionList
                  })
              })
            })
          } else {
            associatedAddObj = AssociatedAddress.build({address: destination, nickName: destination})
            updateAssociatedAdd(associatedAddObj)
            .then(updatedAssociatedAdd => {
              transactionObj.setAssociatedaddress(updatedAssociatedAdd, {save: false})
              updateTransaction(transactionObj)
              .then(updatedTransaction => {
                findTransactionsByUserId(user.id, transactionTypeObj.typeName)
                .then(transactionList => {
                  res
                    .status(200)
                    .send({
                      transactionList
                    })
                })
              })
            })
          }
        })
      } else {
        updateTransaction(transactionObj)
        .then(updatedTransaction => {
          findTransactionsByUserId(user.id, transactionTypeObj.typeName)
          .then(transactionList => {
            res
              .status(200)
              .send({
                transactionList
              })
          })
        })
      }
    })
  })
})

router.post('/api/transactions/delete-transaction', ensureAuthorization, (req, res) => {
  console.log('/api/transactions/delete-transaction')
  const { body, user } = req
  if ( !body ) {
  	rejectRequest('Missing request body', res)
    return
  }

  const { transactionIds, listingParameters } = body
  if ( !transactionIds || !listingParameters ) {
  	rejectRequest('Missing required arguments', res)
  	return
  }

  let trxType = 'Sale'
  if (listingParameters.trxType)
    trxType = listingParameters.trxType

  async.eachOfSeries(transactionIds, function(trxId, index, nextAddCallback) {
    deleteTransactionById(trxId)
    .then(result => {
      nextAddCallback()
    })
  }, function(err) {
    if ( err ) {
      rejectRequest('Failed to process addresses, please try again', res)
      return
    } else {
      findTransactionsByUserId(user.id, trxType)
      .then(transactionList => {
        res
          .status(200)
          .send({
            transactionList
          })
      })
    }
  })
})

router.post('/api/transactions/update-transactions-type', ensureAuthorization, (req, res) => {
  console.log('/api/transactions/update-transactions-type')
  const { body, user } = req
  if ( !body ) {
  	rejectRequest('Missing request body', res)
    return
  }

  const { transactionIds, selectedTrxTypeId, listingParameters } = body
  if ( !transactionIds || !selectedTrxTypeId || !listingParameters ) {
  	rejectRequest('Missing required arguments', res)
  	return
  }

  let trxType = 'Sale'
  if (listingParameters.trxType)
    trxType = listingParameters.trxType

  async.eachOfSeries(transactionIds, function(trxId, index, nextAddCallback) {
    findTransactionById(trxId)
    .then(transactionObj => {
      findTransactionTypeById(selectedTrxTypeId)
      .then(transactionTypeObj => {
        transactionObj.setTransactiontype(transactionTypeObj, {save: false})
        updateTransaction(transactionObj)
        .then(updatedTransaction => {
          nextAddCallback()
        })
      })
    })
  }, function(err) {
    if ( err ) {
      rejectRequest('Failed to process addresses, please try again', res)
      return
    } else {
      findTransactionsByUserId(user.id, trxType)
      .then(transactionList => {
        res
          .status(200)
          .send({
            transactionList
          })
      })
    }
  })
})

export default router
