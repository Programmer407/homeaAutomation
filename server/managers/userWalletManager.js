import UserWallet from '../models/UserWallet';

export const insertUserWallet = (userWalletObj): Promise<any> =>
  userWalletObj.save()
  .then(obj => {
    return obj
  })