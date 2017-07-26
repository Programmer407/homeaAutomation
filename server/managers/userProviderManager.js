// libs
import UserProvider from '../models/UserProvider';
import User from '../models/User';
import Provider from '../models/Provider';
import UserWallet from '../models/UserWallet';
import Transaction from '../models/Transaction';

export const findAllUserProviderList = (id:number):Object =>
  UserProvider.findAll(Object.assign({
    include: [
      {
        model: User,
        where: { id }
      }, 
      {
        model: Provider
      }, 
      { 
        model: UserWallet, 
        as: 'UserWallets',
        include: [{model: Transaction, as: 'Transactions'}] 
      }
    ]
  }))
  .then(obj => {
    return obj
  })

export const findUserProviderByID = (id:number):Object =>
  UserProvider.findOne(Object.assign({
    where: {
      id
    }
  }))
  .then(obj => {
    return obj
  })

  export const findUserProviderByAccountName = (accountName:number):Object =>
  UserProvider.findOne(Object.assign({
    where: {
      accountName
    }
  }))
  .then(obj => {
    return obj
  })

export const insertUserProvider = (userProviderObj): Promise<any> =>
  userProviderObj.save()
  .then(obj => {
    return obj
  })

export const updateUserProvider = (userProviderObj): Promise<any> =>
  userProviderObj.save()
  .then(obj => {
    return obj
  })