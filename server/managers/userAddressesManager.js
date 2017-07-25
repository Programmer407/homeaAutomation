// libs
import User from '../models/User';
import UserAddress from '../models/UserAddress';

export const findAllUserAddresses = (id:number):Object =>
  UserAddress.findAll(Object.assign({
    include: [{
        model: User,
        where: { id }
    }]
  }))
  .then(obj => {
    return obj
  })

export const findUserAddressByAddress = (id:number, address:string):Object =>
  UserAddress.findOne(Object.assign({
    where: {
      address
    },
    include: [{
        model: User,
        where: { id }
    }]
  }))
  .then(obj => {
    return obj
  })

export const findUserAddressById = (id:number):Object =>
  UserAddress.findOne(Object.assign({
    where: {
      id
    }
  }))
  .then(obj => {
    return obj
  })

export const insertUserAddress = (userAddressObj): Promise<any> =>
  userAddressObj.save()
  .then(obj => {
    return obj
  })

export const updateUserAddress = (userAddressObj): Promise<any> =>
  userAddressObj.save()
  .then(obj => {
    return obj
  })