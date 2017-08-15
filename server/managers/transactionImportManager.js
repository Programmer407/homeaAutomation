// libs
import TransactionImportType from '../models/TransactionImportType'

export const findTrxImportTypeById = (id:number):Object =>
  TransactionImportType.findOne(Object.assign({
    where: {
      id
    }
  }))
  .then(obj => {
    return obj
  })