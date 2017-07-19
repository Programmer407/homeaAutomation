// libs
import UserProvider from '../models/UserProvider';
import User from '../models/User';

export const findAllByUserID = (id:number):Object =>
  UserProvider.find(Object.assign({
    where: {
      User.id: id
    }
  }))
  .then(obj => {
    return obj
  })
