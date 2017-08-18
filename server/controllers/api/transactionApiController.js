// libs
import express from 'express'
import WAValidator from 'wallet-address-validator'
import moment from 'moment'
import async from 'async'

// src
import Transaction from './../../models/Transaction'
import AssociatedAddress from './../../models/AssociatedAddress'
import { ensureAuthorization, rejectRequest } from '../../utils'
import { findTransactionsByUserId, findTransactionsBySearchText, 
  findTransactionsBySearchTextDate, findTransactionsBySearchTextStartDate, 
  findTransactionsBySearchTextEndDate, findTransactionsBySearchDate, 
  findTransactionsBySearchStartDate, findTransactionsBySearchEndDate,
  deleteTransactionById, updateTransaction, findTransactionById } from '../../managers/transactionManager'
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
  if (listingParameters.trxType) trxType = listingParameters.trxType
    
  let searchParam = ''
  if (listingParameters.queryString) searchParam = listingParameters.queryString
    
  let startDate = ''
  if (listingParameters.startDate) {
    const start_date = new Date(listingParameters.startDate)
    const moment_start_date = moment(start_date).format("YYYY-MM-DD HH:MM:SS")
    startDate = moment_start_date
  }

  let endDate = ''
  if (listingParameters.endDate) {
    const end_date = new Date(listingParameters.endDate)
    const moment_end_date = moment(end_date).format("YYYY-MM-DD HH:MM:SS")
    endDate = moment_end_date
  }

  let limit = 10
  if (listingParameters.limit) limit = listingParameters.limit

  let offset = 0
  if (listingParameters.offset) offset = listingParameters.offset

  // let orderBy = 'transactionimporttype.import_type_name,useraddress.nick_name,userwallet.wallet_name'
  let orderBy = 'transactionDate'
  if (listingParameters.orderBy) orderBy = listingParameters.orderBy

  let orderWay = 'DESC'
  if (listingParameters.orderWay) orderWay = listingParameters.orderWay

  const orderbyArray = orderBy.toString().split(',')
  let order = ''
  async.eachOfSeries(orderbyArray, (ordering, index, nextAddCallback) => {
    order += ordering + ' ' + orderWay + ', '
    nextAddCallback()
  })
  order = order.substring(0, order.length - 2)
  console.log('order : ' + order)

  if (searchParam && startDate && endDate) {
    console.log('searchParam : ' + searchParam + ' AND startDate : ' + startDate + ' AND endDate : ' + endDate)
    findTransactionsBySearchTextDate(user.id, trxType, searchParam, startDate, endDate, order, limit, offset)
    .then(transactionList => {
      res
        .status(200)
        .send({
          transactionList,
          trxType
        })
    })
  } else if (searchParam && startDate) {
    console.log('searchParam : ' + searchParam + ' AND startDate : ' + startDate)
    findTransactionsBySearchTextStartDate(user.id, trxType, searchParam, startDate, order, limit, offset)
    .then(transactionList => {
      res
        .status(200)
        .send({
          transactionList,
          trxType
        })
    })
  } else if (searchParam && endDate) {
    console.log('searchParam : ' + searchParam + ' AND endDate : ' + endDate)
    findTransactionsBySearchTextEndDate(user.id, trxType, searchParam, endDate, order, limit, offset)
    .then(transactionList => {
      res
        .status(200)
        .send({
          transactionList,
          trxType
        })
    })
  } else if (startDate && endDate) {
    console.log('startDate : ' + startDate + ' AND endDate : ' + endDate)
    findTransactionsBySearchDate(user.id, trxType, startDate, endDate, order, limit, offset)
    .then(transactionList => {
      res
        .status(200)
        .send({
          transactionList,
          trxType
        })
    })
  } else if (searchParam) {
    console.log('searchParam : ' + searchParam)
    findTransactionsBySearchText(user.id, trxType, searchParam, order, limit, offset)
    .then(transactionList => {
      res
        .status(200)
        .send({
          transactionList,
          trxType
        })
    })
  } else if (startDate) {
    console.log('startDate : ' + startDate)
    findTransactionsBySearchStartDate(user.id, trxType, startDate, order, limit, offset)
    .then(transactionList => {
      res
        .status(200)
        .send({
          transactionList,
          trxType
        })
    })
  } else if (endDate) {
    console.log('endDate : ' + endDate)
    findTransactionsBySearchEndDate(user.id, trxType, endDate, order, limit, offset)
    .then(transactionList => {
      res
        .status(200)
        .send({
          transactionList,
          trxType
        })
    })
  } else {
    console.log('else default listing.')
    findTransactionsByUserId(user.id, trxType, order, limit, offset)
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

  const { trxData, listingParameters } = body
  if ( !trxData || !listingParameters ) {
  	rejectRequest('Missing required arguments', res)
  	return
  }

  let limit = 10
  if (listingParameters.limit) limit = listingParameters.limit

  let offset = 0
  if (listingParameters.offset) offset = listingParameters.offset
  
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
            .then(() => {
              findTransactionsByUserId(user.id, transactionTypeObj.typeName, 'transactionDate DESC', limit, offset)
              .then(transactionList => {
                res
                  .status(200)
                  .send({
                    transactionList
                  })
              })
            })
          } else {
            const associatedAddNew = AssociatedAddress.build({address: destination, nickName: destination})
            updateAssociatedAdd(associatedAddNew)
            .then(updatedAssociatedAdd => {
              transactionObj.setAssociatedaddress(updatedAssociatedAdd, {save: false})
              updateTransaction(transactionObj)
              .then(() => {
                findTransactionsByUserId(user.id, transactionTypeObj.typeName, 'transactionDate DESC', limit, offset)
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
        .then(() => {
          findTransactionsByUserId(user.id, transactionTypeObj.typeName, 'transactionDate DESC', limit, offset)
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

  const { trxData, listingParameters } = body
  if ( !trxData || !listingParameters ) {
  	rejectRequest('Missing required arguments', res)
  	return
  }

  const { transactionId, transactionDate, destination, note, amount, asset, value, transactionTypeId } = trxData
  if ( !transactionId || !transactionDate || !destination || !note || !amount || !asset || !value || !transactionTypeId ) {
  	rejectRequest('Missing required arguments', res)
  	return
  }
  
  let limit = 10
  if (listingParameters.limit) limit = listingParameters.limit

  let offset = 0
  if (listingParameters.offset) offset = listingParameters.offset

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
            .then(() => {
              findTransactionsByUserId(user.id, transactionTypeObj.typeName, 'transactionDate DESC', limit, offset)
              .then(transactionList => {
                res
                  .status(200)
                  .send({
                    transactionList
                  })
              })
            })
          } else {
            const associatedAddNew = AssociatedAddress.build({address: destination, nickName: destination})
            updateAssociatedAdd(associatedAddNew)
            .then(updatedAssociatedAdd => {
              transactionObj.setAssociatedaddress(updatedAssociatedAdd, {save: false})
              updateTransaction(transactionObj)
              .then(() => {
                findTransactionsByUserId(user.id, transactionTypeObj.typeName, 'transactionDate DESC', limit, offset)
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
        .then(() => {
          findTransactionsByUserId(user.id, transactionTypeObj.typeName, 'transactionDate DESC', limit, offset)
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
  if (listingParameters.trxType) trxType = listingParameters.trxType

  let limit = 10
  if (listingParameters.limit) limit = listingParameters.limit

  let offset = 0
  if (listingParameters.offset) offset = listingParameters.offset

  async.eachOfSeries(transactionIds, (trxId, index, nextAddCallback) => {
    deleteTransactionById(trxId)
    .then(() => {
      nextAddCallback()
    })
  }, (err) => {
    if ( err ) {
      rejectRequest('Failed to process addresses, please try again', res)
    } else {
      findTransactionsByUserId(user.id, trxType, 'transactionDate DESC', limit, offset)
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
  if (listingParameters.trxType) trxType = listingParameters.trxType

  let limit = 10
  if (listingParameters.limit) limit = listingParameters.limit

  let offset = 0
  if (listingParameters.offset) offset = listingParameters.offset

  async.eachOfSeries(transactionIds, (trxId, index, nextAddCallback) => {
    findTransactionById(trxId)
    .then(transactionObj => {
      findTransactionTypeById(selectedTrxTypeId)
      .then(transactionTypeObj => {
        transactionObj.setTransactiontype(transactionTypeObj, {save: false})
        updateTransaction(transactionObj)
        .then(() => {
          nextAddCallback()
        })
      })
    })
  }, (err) => {
    if ( err ) {
      rejectRequest('Failed to process addresses, please try again', res)
    } else {
      findTransactionsByUserId(user.id, trxType, 'transactionDate DESC', limit, offset)
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
