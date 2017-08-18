// libs
import UserProvider from '../models/UserProvider'
import User from '../models/User'
import Provider from '../models/Provider'
import UserWallet from '../models/UserWallet'
import Transaction from '../models/Transaction'
import AssociatedAddress from '../models/AssociatedAddress'

export const findAllUserProviderList = (id) =>
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
        include: [
          {
            model: Transaction, 
            as: 'Transactions', 
            include: {
              model: AssociatedAddress
            }
          }
        ] 
      }
    ]
  }))
  .then(obj => {
    return obj
  })

export const findUserProviderByID = (id) =>
  UserProvider.findOne(Object.assign({
    where: {
      id
    },
    include: {
        model: Provider
      }
  }))
  .then(obj => {
    return obj
  })

  export const findUserProviderByAccountName = (accountName) =>
  UserProvider.findOne(Object.assign({
    where: {
      accountName
    }
  }))
  .then(obj => {
    return obj
  })

export const insertUserProvider = (userProviderObj) =>
  userProviderObj.save()
  .then(obj => {
    return obj
  })

export const updateUserProvider = (userProviderObj) =>
  userProviderObj.save()
  .then(obj => {
    return obj
  })
