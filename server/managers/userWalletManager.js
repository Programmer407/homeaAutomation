import UserWallet from '../models/UserWallet';

export const findUserWalletByWalletId = (walletId:number):Object =>
  UserWallet.findOne(Object.assign({
    where: {
      walletId
    }
  }))
  .then(obj => {
    return obj
  })

export const updateUserWallet = (userWalletObj): Promise<any> =>
  userWalletObj.save()
  .then(obj => {
    return obj
  })

export const insertUserWallet = (userWalletObj): Promise<any> =>
  userWalletObj.save()
  .then(obj => {
    return obj
  })

export const deleteUserWalletById = (walletId:number):Object =>
    UserWallet.findById(walletId)
    .then((object) => {
      if(null == object)
        return;
      
      return object.destroy();
    });
