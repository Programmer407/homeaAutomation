/*
import UserWallet from '../models/UserWallet'

export const findUserWalletByWalletId = (walletId) =>
  UserWallet.findOne(Object.assign({
    where: {
      walletId
    }
  }))
  .then(obj => {
    return obj
  })

export const updateUserWallet = (userWalletObj) =>
  userWalletObj.save()
  .then(obj => {
    return obj
  })

export const insertUserWallet = (userWalletObj) =>
  userWalletObj.save()
  .then(obj => {
    return obj
  })

export const deleteUserWalletById = (walletId) =>
    UserWallet.findById(walletId)
    .then((object) => {
      if(null == object)
        return
      
      return object.destroy({ force: true })
    })
*/
