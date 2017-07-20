// libs
import UserProvider from '../models/UserProvider';

export const insertUserProvider = (userProviderObj): Promise<any> =>
  userProviderObj.save()
  .then(obj => {
    return obj
  })