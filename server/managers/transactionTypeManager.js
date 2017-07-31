// libs
import TransactionType from '../models/TransactionType';

export const findTransactionTypeById = (id:number):Object =>
  TransactionType.findOne(Object.assign({
    where: {
      id
    }
  }))
  .then(obj => {
    return obj
  })

export const findTransactionTypeByName = (typeName:number):Object =>
  TransactionType.findOne(Object.assign({
    where: {
      typeName
    }
  }))
  .then(obj => {
    return obj
  })