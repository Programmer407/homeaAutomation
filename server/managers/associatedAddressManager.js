// libs
import AssociatedAddress from '../models/AssociatedAddress'

export const findAssociatedAddById = (id:number):Object =>
  AssociatedAddress.findOne(Object.assign({
    where: {
      id
    }
  }))
  .then(obj => {
    return obj
  })

export const findAssociatedAddByAdd = (address:number):Object =>
  AssociatedAddress.findOne(Object.assign({
    where: {
      address
    }
  }))
  .then(obj => {
    return obj
  })

export const updateAssociatedAdd = (associatedAddObj): Promise<any> =>
  associatedAddObj.save()
  .then(obj => {
    return obj
  })