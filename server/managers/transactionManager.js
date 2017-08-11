// libs
import Transaction from '../models/Transaction';
import User from '../models/User';
import TransactionType from '../models/TransactionType';

export const findTransactionsByUserId = (id, typeName):Object =>
  Transaction.findAll(Object.assign({
    include: [
      {
        model: User,
        where: { id }
      },
      {
        model: TransactionType,
        where: { typeName }
      }
    ]
  }))
  .then(obj => {
    return obj
  })

export const findTransactionById = (id):Object =>
  Transaction.findOne(Object.assign({
    where: {
      id
    }
  }))
  .then(obj => {
    return obj
  })

export const findTransactionByTrxId = (trxId):Object =>
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

export const deleteTransactionById = (transactionId:number):Object =>
  Transaction.findById(transactionId)
  .then((object) => {
    if(null == object)
      return;
    
    return object.destroy({ force: true });
  });