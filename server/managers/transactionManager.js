// libs
import Transaction from '../models/Transaction';

export const findTransactionsById = (id:number):Object =>
  Transaction.findOne(Object.assign({
    where: {
      id
    }
  }))
  .then(obj => {
    return obj
  })

export const findTransactionByTrxId = (trxId:number):Object =>
  Transaction.findOne(Object.assign({
    where: {
      trxId
    }
  }))
  .then(obj => {
    return obj
  })

export const updateTransaction = (transactionObj): Promise<any> =>
  transactionObj.save()
  .then(obj => {
    return obj
  })