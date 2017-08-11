// libs
import express from 'express'
import WAValidator from 'wallet-address-validator';

// src
import { caughtError, ensureAuthorization, rejectRequest } from '../../utils'
import { findTransactionsByUserId, deleteTransactionById } from '../../managers/transactionManager'
import { findTransactionTypeById } from '../../managers/transactionTypeManager'
import { findTrxImportTypeById } from '../../managers/transactionImportManager'
import { findAssociatedAddByAdd, updateAssociatedAdd } from '../../managers/associatedAddressManager'

const router = express.Router()

router.post('/api/transactions/transaction-data', ensureAuthorization, (req, res) => {
  console.log('/api/transactions/transaction-data called.')
  const { body, user } = req
  if ( !body ) {
  	rejectRequest('Missing request body', res)
    return;
  }

  const { transType } = body
  if ( !transType ) {
  	rejectRequest('Missing required arguments', res)
  	return;
  }

  findTransactionsByUserId(user.id, transType)
  	.then(transactionList => {
    	res
      	.status(200)
        .send({
        	transactionList
        })
    })
    .catch(error => {
    	caughtError(res, error)
    })
})

router.post('/api/transactions/insert-transaction', ensureAuthorization, (req, res) => {
  console.log('/api/transactions/insert-transaction')
  const { body, user } = req
  if ( !body ) {
  	rejectRequest('Missing request body', res)
    return;
  }

  const { transactionDate, destination, note, amount, asset, value, transactionTypeId } = body
  if ( !transactionDate || !destination || !note || !amount || !asset || !value || !transactionTypeId ) {
  	rejectRequest('Missing required arguments', res)
  	return;
  }

  var trx_date = new Date(transactionDate);
  var moment_date = moment(trx_date).format("YYYY-MM-DD HH:MM:SS")

  const transactionObj = Transaction.build({destination: destination, transactionDate: moment_date, amount: amount, asset: asset, value: value})
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
                      findTransactionsByUserId(user.id, transType)
                        .then(transactionList => {
                          res
                            .status(200)
                            .send({
                              transactionList
                            })
                        })
                        .catch(error => {
                          caughtError(res, error)
                        })
                    })
                } else {
                  associatedAddObj = AssociatedAddress.build({address: destination, nickName: destination})
                  updateAssociatedAdd(associatedAddObj)
                    .then(updatedAssociatedAdd => {
                      transactionObj.setAssociatedaddress(updatedAssociatedAdd, {save: false})
                      updateTransaction(transactionObj)
                        .then(updatedTransaction => {
                          findTransactionsByUserId(user.id, transType)
                            .then(transactionList => {
                              res
                                .status(200)
                                .send({
                                  transactionList
                                })
                            })
                            .catch(error => {
                              caughtError(res, error)
                            })
                        })
                    })
                }
              })
          } else {
            updateTransaction(transactionObj)
              .then(updatedTransaction => {
                findTransactionsByUserId(user.id, transType)
                  .then(transactionList => {
                    res
                      .status(200)
                      .send({
                        transactionList
                      })
                  })
                  .catch(error => {
                    caughtError(res, error)
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
    return;
  }

  const { transactionId, transactionDate, destination, note, amount, asset, value, transactionTypeId } = body
  if ( !transactionId || !transactionDate || !destination || !note || !amount || !asset || !value || !transactionTypeId ) {
  	rejectRequest('Missing required arguments', res)
  	return;insert
  }

  findTransactionById(transactionId)
    .then(transactionObj => {
      transactionObj.destination = destination

      var trx_date = new Date(transactionDate);
      var moment_date = moment(trx_date).format("YYYY-MM-DD HH:MM:SS")
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
                      findTransactionsByUserId(user.id, transType)
                        .then(transactionList => {
                          res
                            .status(200)
                            .send({
                              transactionList
                            })
                        })
                        .catch(error => {
                          caughtError(res, error)
                        })
                    })
                } else {
                  associatedAddObj = AssociatedAddress.build({address: destination, nickName: destination})
                  updateAssociatedAdd(associatedAddObj)
                    .then(updatedAssociatedAdd => {
                      transactionObj.setAssociatedaddress(updatedAssociatedAdd, {save: false})
                      updateTransaction(transactionObj)
                        .then(updatedTransaction => {
                          findTransactionsByUserId(user.id, transType)
                            .then(transactionList => {
                              res
                                .status(200)
                                .send({
                                  transactionList
                                })
                            })
                            .catch(error => {
                              caughtError(res, error)
                            })
                        })
                    })
                }
              })
          } else {
            updateTransaction(transactionObj)
              .then(updatedTransaction => {
                findTransactionsByUserId(user.id, transType)
                  .then(transactionList => {
                    res
                      .status(200)
                      .send({
                        transactionList
                      })
                  })
                  .catch(error => {
                    caughtError(res, error)
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
    return;
  }

  const { transactionId, transType } = body
  if ( !transactionId, !transType ) {
  	rejectRequest('Missing required arguments', res)
  	return;
  }

  deleteTransactionById(transactionId)
		.then(result => {
			findTransactionsByUserId(user.id, transType)
        .then(transactionList => {
          res
            .status(200)
            .send({
              transactionList
            })
        })
        .catch(error => {
          caughtError(res, error)
        })
		})
		.catch(error => {
			caughtError(res, error)
		})
})

export default router