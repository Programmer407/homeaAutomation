/*
// libs
import AssociatedAddress from '../models/AssociatedAddress'

export const findAssociatedAddById = (id) =>
  AssociatedAddress.findOne(Object.assign({
    where: {
      id
    }
  }))
  .then(obj => {
    return obj
  })

export const findAssociatedAddByAdd = (address) =>
  AssociatedAddress.findOne(Object.assign({
    where: {
      address
    }
  }))
  .then(obj => {
    return obj
  })

export const updateAssociatedAdd = (associatedAddObj) =>
  associatedAddObj.save()
  .then(obj => {
    return obj
  })
*/
