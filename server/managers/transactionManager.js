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