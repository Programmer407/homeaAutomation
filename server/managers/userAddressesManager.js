// libs
import User from '../models/User';
import UserAddress from '../models/UserAddress';
import Transaction from '../models/Transaction';
import AssociatedAddress from '../models/AssociatedAddress';

export const findAllUserAddresses = (id:number):Object =>
  UserAddress.findAll(Object.assign({
    include: [
      {
        model: User,
        where: { id }
      },
      {
        model: Transaction, 
        as: 'AddressTransactions', 
          include: {
            model: AssociatedAddress
          }
      }
    ]
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

export const deleteUserAddressById = (userAddressId:number):Object =>
    UserAddress.findById(userAddressId)
    .then((object) => {
      if(null == object)
        return;
      
      return object.destroy({ force: true });
    });
